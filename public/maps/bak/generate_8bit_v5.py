#!/usr/bin/env python3
"""
Generate 8-bit country paths using a GLOBAL SHARED GRID.

All countries are rasterized onto a single grid (1920x1080 at 4px cells = 480x270).
Each cell belongs to exactly ONE country, guaranteeing:
  - Zero overlap between any two countries
  - Neighboring countries automatically share grid edges (touch)
  - Consistent blocky aesthetic across the entire map

Phase 1: Rasterize all countries onto the global grid
Phase 2: Trace outlines per country from the grid
Phase 3: Output SVG
"""

import xml.etree.ElementTree as ET
import re
import math
import numpy as np
from collections import defaultdict
from svgpathtools import parse_path

SVG_FILE = '/Users/stuxxnet/Desktop/8bit-world-map-claude-1.svg'
OUTPUT_FILE = '/Users/stuxxnet/Desktop/8bit-world-map-v5.svg'

ET.register_namespace('', 'http://www.w3.org/2000/svg')
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
ET.register_namespace('amcharts', 'http://amcharts.com/ammap')

NS = 'http://www.w3.org/2000/svg'
COUNTRY_CLASS = 'country8'

# Global grid: 4px cells over 1920x1080 viewport
CELL_SIZE = 4.0
GRID_W = int(math.ceil(1920 / CELL_SIZE))  # 480
GRID_H = int(math.ceil(1080 / CELL_SIZE))  # 270

SKIP_COUNTRIES = {
    'AD', 'AS', 'AW', 'AX', 'BM', 'BQ', 'BV', 'CC', 'CK', 'CV', 'CW', 'CX',
    'FK', 'FM', 'FO', 'GG', 'GI', 'GO', 'GS', 'GU', 'HK', 'HM', 'IM',
    'IO', 'JE', 'JU', 'KI', 'KM', 'KY', 'LI', 'MC', 'MF', 'MH', 'MO',
    'MP', 'MT', 'MU', 'MV', 'NC', 'NF', 'NR', 'NU', 'PF', 'PM', 'PN',
    'PW', 'RE', 'SB', 'SG', 'SH', 'SM', 'ST', 'TF', 'TK', 'TO',
    'TT', 'TV', 'VA', 'VU', 'WF', 'WS', 'YT', 'BH', 'BN', 'TL',
    'SC',  # Added manually with better size
}


# =====================================================================
# SVG parsing
# =====================================================================

def get_original_paths(root):
    orig_group = root.find(f'.//{{{NS}}}g[@id="original_paths"]')
    paths = {}
    if orig_group is not None:
        for elem in orig_group.iter():
            eid = elem.get('id')
            if eid and len(eid) == 2 and eid.isalpha() and eid.isupper():
                d = elem.get('d')
                if d:
                    paths[eid] = d
    return paths


# =====================================================================
# Path sampling (unchanged)
# =====================================================================

def sample_subpaths(d_string, num_samples_per_subpath=500):
    subpath_strings = re.split(r'(?=[Mm])', d_string.strip())
    subpath_strings = [s.strip() for s in subpath_strings if s.strip()]

    all_points = []
    all_subpath_points = []

    for sp_str in subpath_strings:
        try:
            path = parse_path(sp_str)
            length = path.length()
            if length == 0:
                continue
            n_samples = max(80, min(num_samples_per_subpath, int(length * 8)))
            points = []
            for i in range(n_samples + 1):
                t = i / n_samples
                try:
                    pt = path.point(t)
                    points.append((pt.real, pt.imag))
                except Exception:
                    continue
            if points:
                all_points.extend(points)
                all_subpath_points.append(points)
        except Exception:
            continue

    return all_points, all_subpath_points


# =====================================================================
# Global grid rasterization
# =====================================================================

def rasterize_vector_to_grid(d_string, grid, idx, dx=0, dy=0):
    """Rasterize a vector country path onto the global grid.
    Only fills cells not already claimed. Optional dx/dy shift.
    Each subpath is rasterized independently (important for archipelagos
    like Indonesia where filling all subpaths together would fill ocean)."""
    all_points, subpath_points = sample_subpaths(d_string, 500)
    if not all_points:
        return 0

    # Apply shift if needed
    if dx != 0 or dy != 0:
        all_points = [(p[0] + dx, p[1] + dy) for p in all_points]
        subpath_points = [[(p[0] + dx, p[1] + dy) for p in sp] for sp in subpath_points]

    filled = 0

    # Process each subpath independently with its own scanline fill
    for sp_points in subpath_points:
        if len(sp_points) < 3:
            continue

        # Build edges for this subpath only
        edges = []
        for i in range(len(sp_points) - 1):
            edges.append((sp_points[i], sp_points[i + 1]))
        edges.append((sp_points[-1], sp_points[0]))

        ys = [p[1] for p in sp_points]
        min_row = max(0, int(min(ys) / CELL_SIZE))
        max_row = min(GRID_H - 1, int(max(ys) / CELL_SIZE))

        for row in range(min_row, max_row + 1):
            y = (row + 0.5) * CELL_SIZE
            intersections = []
            for (x1, y1), (x2, y2) in edges:
                if (y1 <= y < y2) or (y2 <= y < y1):
                    if abs(y2 - y1) > 1e-10:
                        t = (y - y1) / (y2 - y1)
                        intersections.append(x1 + t * (x2 - x1))
            intersections.sort()
            for i in range(0, len(intersections) - 1, 2):
                col_start = max(0, int(intersections[i] / CELL_SIZE))
                col_end = min(GRID_W, int(math.ceil(intersections[i + 1] / CELL_SIZE)))
                for col in range(col_start, col_end):
                    if grid[row][col] == 0:
                        grid[row][col] = idx
                        filled += 1

    # Boundary cells
    for px, py in all_points:
        col = int(px / CELL_SIZE)
        row = int(py / CELL_SIZE)
        if 0 <= row < GRID_H and 0 <= col < GRID_W:
            if grid[row][col] == 0:
                grid[row][col] = idx
                filled += 1

    return filled


def winding_number(px, py, polygon):
    """Compute winding number of point (px,py) w.r.t. polygon.
    Non-zero winding number means the point is inside.
    Handles complex concave polygons correctly (unlike even-odd scanline)."""
    wn = 0
    n = len(polygon)
    for i in range(n):
        x1, y1 = polygon[i]
        x2, y2 = polygon[(i + 1) % n]
        if y1 <= py:
            if y2 > py:  # upward crossing
                # Is point left of edge?
                cross = (x2 - x1) * (py - y1) - (px - x1) * (y2 - y1)
                if cross > 0:
                    wn += 1
        else:
            if y2 <= py:  # downward crossing
                cross = (x2 - x1) * (py - y1) - (px - x1) * (y2 - y1)
                if cross < 0:
                    wn -= 1
    return wn


def rasterize_polygon_to_grid(points, grid, idx):
    """Rasterize a manually-defined polygon onto the global grid.
    Uses winding number point-in-polygon test instead of even-odd scanline,
    which correctly handles complex concave polygons like Russia."""
    if not points:
        return 0

    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    min_row = max(0, int(min(ys) / CELL_SIZE))
    max_row = min(GRID_H - 1, int(max(ys) / CELL_SIZE))
    min_col = max(0, int(min(xs) / CELL_SIZE))
    max_col = min(GRID_W - 1, int(max(xs) / CELL_SIZE))

    filled = 0
    for row in range(min_row, max_row + 1):
        cy = (row + 0.5) * CELL_SIZE
        for col in range(min_col, max_col + 1):
            if grid[row][col] != 0:
                continue
            cx = (col + 0.5) * CELL_SIZE
            if winding_number(cx, cy, points) != 0:
                grid[row][col] = idx
                filled += 1

    # Also fill boundary cells by sampling along edges
    edges = []
    for i in range(len(points)):
        j = (i + 1) % len(points)
        edges.append((points[i], points[j]))

    for (x1, y1), (x2, y2) in edges:
        length = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        n = max(1, int(length / (CELL_SIZE * 0.3)))
        for s in range(n + 1):
            t = s / n
            px = x1 + t * (x2 - x1)
            py = y1 + t * (y2 - y1)
            col = int(px / CELL_SIZE)
            row = int(py / CELL_SIZE)
            if 0 <= row < GRID_H and 0 <= col < GRID_W:
                if grid[row][col] == 0:
                    grid[row][col] = idx
                    filled += 1

    return filled


def rasterize_rect_to_grid(x, y, w, h, grid, idx):
    """Rasterize a rectangle onto the global grid."""
    min_col = max(0, int(x / CELL_SIZE))
    max_col = min(GRID_W - 1, int((x + w) / CELL_SIZE))
    min_row = max(0, int(y / CELL_SIZE))
    max_row = min(GRID_H - 1, int((y + h) / CELL_SIZE))

    filled = 0
    for row in range(min_row, max_row + 1):
        for col in range(min_col, max_col + 1):
            if grid[row][col] == 0:
                grid[row][col] = idx
                filled += 1
    return filled


# =====================================================================
# Outline tracing from global grid
# =====================================================================

def trace_country_from_grid(grid, idx):
    """Trace polygon outlines for a specific country from the global grid."""
    cells = set(map(tuple, np.argwhere(grid == idx)))
    if not cells:
        return []

    edge_map = defaultdict(list)

    def pt(r, c):
        return (round(c * CELL_SIZE, 2), round(r * CELL_SIZE, 2))

    for r, c in cells:
        if (r - 1, c) not in cells:
            edge_map[pt(r, c)].append(pt(r, c + 1))
        if (r, c + 1) not in cells:
            edge_map[pt(r, c + 1)].append(pt(r + 1, c + 1))
        if (r + 1, c) not in cells:
            edge_map[pt(r + 1, c + 1)].append(pt(r + 1, c))
        if (r, c - 1) not in cells:
            edge_map[pt(r + 1, c)].append(pt(r, c))

    # Chain edges into polygons
    polygons = []
    visited_edges = set()

    for start_pt in list(edge_map.keys()):
        for start_end in list(edge_map[start_pt]):
            edge_key = (start_pt, start_end)
            if edge_key in visited_edges:
                continue
            polygon = [start_pt]
            current = start_end
            visited_edges.add(edge_key)
            max_steps = sum(len(v) for v in edge_map.values()) + 1
            steps = 0
            while current != start_pt and steps < max_steps:
                polygon.append(current)
                steps += 1
                found = False
                if current in edge_map:
                    for next_end in edge_map[current]:
                        ek = (current, next_end)
                        if ek not in visited_edges:
                            visited_edges.add(ek)
                            current = next_end
                            found = True
                            break
                if not found:
                    break
            if current == start_pt and len(polygon) >= 4:
                polygons.append(polygon)

    return polygons


# =====================================================================
# Polygon utilities
# =====================================================================

def simplify_polygon(points):
    if len(points) < 3:
        return points
    simplified = []
    n = len(points)
    for i in range(n):
        prev = points[(i - 1) % n]
        curr = points[i]
        next_pt = points[(i + 1) % n]
        dx1 = 1 if curr[0] > prev[0] else (-1 if curr[0] < prev[0] else 0)
        dy1 = 1 if curr[1] > prev[1] else (-1 if curr[1] < prev[1] else 0)
        dx2 = 1 if next_pt[0] > curr[0] else (-1 if next_pt[0] < curr[0] else 0)
        dy2 = 1 if next_pt[1] > curr[1] else (-1 if next_pt[1] < curr[1] else 0)
        if (dx1, dy1) != (dx2, dy2):
            simplified.append(curr)
    return simplified


def polygon_area(points):
    n = len(points)
    area = 0
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1]
        area -= points[j][0] * points[i][1]
    return abs(area) / 2


def add_element(parent, eid, points):
    simplified = simplify_polygon(points)
    if len(simplified) < 4:
        return False
    if len(simplified) == 4:
        xs_s = set(p[0] for p in simplified)
        ys_s = set(p[1] for p in simplified)
        if len(xs_s) == 2 and len(ys_s) == 2:
            x1, x2 = sorted(xs_s)
            y1, y2 = sorted(ys_s)
            elem = ET.SubElement(parent, f'{{{NS}}}rect')
            elem.set('id', eid)
            elem.set('class', COUNTRY_CLASS)
            elem.set('x', str(x1))
            elem.set('y', str(y1))
            elem.set('width', str(round(x2 - x1, 2)))
            elem.set('height', str(round(y2 - y1, 2)))
            return True
    pts_str = " ".join(f"{p[0]} {p[1]}" for p in simplified)
    elem = ET.SubElement(parent, f'{{{NS}}}polygon')
    elem.set('id', eid)
    elem.set('class', COUNTRY_CLASS)
    elem.set('points', pts_str)
    return True


# =====================================================================
# Manual country definitions (return point lists for grid rasterization)
# =====================================================================

def get_russia_points():
    """Russia polygon - geographically accurate with stepped arctic coast."""
    return [
        # WESTERN BORDER (south to north)
        (571, 267), (571, 259), (567, 259),
        (567, 247), (571, 247), (571, 239),
        (567, 239), (567, 227),
        (567, 218),
        (566, 218), (566, 202),

        # ARCTIC COAST (west to east)
        # Kola Peninsula
        (566, 195), (573, 195), (573, 188), (580, 188),
        (580, 181), (594, 181), (594, 188), (601, 188),
        (601, 195),
        # White Sea indent
        (608, 195), (608, 202), (615, 202), (615, 209),
        (622, 209), (622, 202), (629, 202), (629, 195),
        # Barents coast
        (636, 195), (636, 188), (650, 188), (650, 181),
        (664, 181), (664, 188), (671, 188),
        # Novaya Zemlya
        (671, 181), (678, 181), (678, 174), (685, 174),
        (685, 181), (692, 181), (692, 188),
        # Kara Sea
        (699, 188), (699, 195), (706, 195), (706, 188),
        (720, 188), (720, 181),
        # Taymyr Peninsula (northernmost)
        (727, 181), (727, 174), (734, 174), (734, 167),
        (748, 167), (748, 174), (755, 174), (755, 181),
        (762, 181), (762, 188),
        # Laptev Sea
        (769, 188), (769, 195), (776, 195), (776, 202),
        (783, 202), (783, 195), (790, 195), (790, 188),
        # New Siberian Islands
        (804, 188), (804, 181), (811, 181), (811, 188),
        (825, 188), (825, 195),
        # East Siberian Sea
        (832, 195), (832, 202), (839, 202), (839, 195),
        (853, 195), (853, 188), (867, 188),
        (867, 195), (874, 195),
        # Chukotka
        (874, 202), (881, 202), (881, 195),
        (895, 195), (895, 188), (909, 188),
        (909, 195), (923, 195), (923, 202),
        (930, 202), (930, 209), (937, 209),
        (937, 216), (944, 216),

        # PACIFIC COAST (north to south)
        (944, 223), (937, 223),
        # Kamchatka
        (937, 230), (930, 230), (930, 244),
        (937, 244), (937, 251), (944, 251),
        (944, 265), (937, 265), (937, 272),
        (930, 272), (930, 279), (937, 279), (937, 293),
        # Sea of Okhotsk
        (930, 293), (930, 286), (923, 286),
        (923, 279), (916, 279), (916, 272),
        (909, 272), (909, 265), (895, 265),
        (895, 272), (881, 272), (881, 279),
        (867, 279), (867, 286), (860, 286),
        # Coast toward Vladivostok
        (860, 293), (853, 293), (853, 300),
        (846, 300), (846, 307), (839, 307),
        (839, 321), (832, 321), (832, 335),
        # Primorsky Krai
        (839, 335), (839, 342), (846, 342),
        (846, 353),

        # SOUTHERN BORDER (east to west)
        # North Korea
        (842, 353), (834, 353),
        # China NE
        (834, 342), (832, 342), (832, 335),
        (835, 335), (835, 312), (831, 312), (831, 308),
        (815, 308),
        # Mongolia (border at y=320/324 to close gap with MN grid cells)
        (815, 320), (767, 320), (767, 324),
        (763, 324), (751, 324), (751, 320), (735, 320),
        # Kazakhstan - straight border at y=324 to fill gap with KZ vector cells
        # (KZ is processed first so its cells are already claimed; Russia fills the rest)
        (735, 324), (656, 324),
        # Caspian Sea coast
        (656, 310), (649, 310), (649, 317),
        (642, 317), (642, 331), (635, 331),
        (635, 345), (628, 345),
        (628, 353),
        # Azerbaijan
        (622, 353), (622, 357),
        # Georgia
        (609, 357), (609, 350), (589, 350),
        # Black Sea
        (589, 345), (582, 345), (582, 338),
        # Ukraine
        (579, 338), (579, 318), (575, 318),
        (575, 314), (555, 314), (555, 318),
        (547, 318), (547, 314),
        # Belarus
        (547, 307), (550, 307), (550, 299),
        (554, 299), (554, 295), (566, 295),
        # Baltic / Latvia / Estonia
        (566, 293), (560, 293), (560, 289),
        (556, 289), (556, 285),
        (558, 285), (558, 277),
        (562, 277), (562, 271),
        (571, 271), (571, 267),
    ]


def get_canada_points():
    """Canada polygon - geographically accurate with Hudson Bay, Great Lakes, etc."""
    return [
        # SOUTHERN BORDER (west to east)
        (130, 328),
        (218, 328),
        # Great Lakes
        (218, 335),
        (225, 335), (225, 342),
        (232, 342), (232, 349),
        # Ontario peninsula
        (239, 349), (239, 356),
        (246, 356), (246, 363),
        (253, 363), (253, 370),
        (260, 370), (260, 377),
        # Ontario south tip then back north
        (267, 377), (267, 370),
        (274, 370), (274, 363),
        (281, 363), (281, 356),
        (288, 356), (288, 349),
        # St. Lawrence to Maritimes
        (295, 349), (295, 342),
        (302, 342), (302, 335),
        (309, 335), (309, 328),
        # Maritimes
        (316, 328), (316, 321),
        (323, 321), (323, 314),
        (330, 314),

        # ATLANTIC COAST
        (330, 307), (337, 307), (337, 300),
        (344, 300), (344, 293),
        # Newfoundland
        (337, 293), (337, 286),
        (344, 286), (344, 272),
        (337, 272), (337, 258),

        # LABRADOR
        (344, 258), (344, 244),
        (337, 244), (337, 230),
        (344, 230), (344, 216),

        # UNGAVA BAY
        (337, 216), (337, 209),
        (323, 209), (323, 216),
        (309, 216), (309, 223),
        (295, 223), (295, 216),
        (281, 216),

        # ARCTIC COAST east of Hudson Bay
        (281, 209), (274, 209), (274, 202),

        # HUDSON BAY
        (260, 202), (260, 209),
        (253, 209), (253, 223),
        (246, 223), (246, 237),
        (253, 237), (253, 258),
        (246, 258), (246, 272),
        (239, 272), (239, 279),
        (225, 279), (225, 286),
        (211, 286), (211, 279),
        (204, 279), (204, 272),
        (197, 272), (197, 258),
        (190, 258), (190, 244),
        (183, 244), (183, 230),
        (190, 230), (190, 216),
        (183, 216), (183, 202),

        # ARCTIC COAST west of Hudson Bay
        (176, 202), (176, 195),
        (169, 195), (169, 188),
        (155, 188), (155, 195),
        (141, 195), (141, 188),
        (127, 188), (127, 195),

        # ARCTIC continuing west toward Alaska
        (120, 195), (120, 188),
        (106, 188), (106, 195),
        (92, 195),

        # YUKON / ALASKA BORDER (going south)
        # Canada extends to x=84 to overlap with Alaska's east edge
        # on the global grid. The grid will resolve any conflict
        # (Alaska processed first, so it claims its cells; Canada
        # fills everything east of Alaska automatically).
        (84, 195),
        (84, 304),

        # BC COAST (south from Alaska to US border)
        (120, 304),
        (120, 310),
        (126, 310),
        (126, 318),
        (130, 318),
        (130, 328),
    ]


def get_hawaii_points():
    """Hawaii stepped island shape."""
    return [
        (26, 430), (26, 426), (30, 426), (30, 422),
        (34, 422), (34, 418), (38, 418), (38, 414),
        (42, 414), (42, 418), (46, 418), (46, 422),
        (50, 422), (50, 426), (54, 426), (54, 430),
        (50, 430), (50, 434), (46, 434), (46, 438),
        (42, 438), (42, 434), (38, 434), (38, 430),
        (34, 430), (34, 426), (30, 426), (30, 430),
    ]


# =====================================================================
# Verification
# =====================================================================

def verify_zero_overlap(grid):
    """Confirm that the grid-based approach guarantees zero overlap."""
    # Each cell has exactly one value, so by construction there's no overlap.
    # Count cells per country and check totals.
    unique, counts = np.unique(grid, return_counts=True)
    total_filled = sum(c for u, c in zip(unique, counts) if u != 0)
    print(f"  Grid cells filled: {total_filled} / {GRID_W * GRID_H}")
    print(f"  Countries on grid: {len(unique) - 1}")
    print(f"  Overlap: IMPOSSIBLE (each cell has exactly one owner)")


# =====================================================================
# Main
# =====================================================================

def main():
    tree = ET.parse(SVG_FILE)
    root = tree.getroot()
    original_paths = get_original_paths(root)

    # Clear the 8bit_paths group
    bit_group = root.find(f'.//{{{NS}}}g[@id="_x38_bit_paths"]')
    if bit_group is not None:
        for child in list(bit_group):
            bit_group.remove(child)
    else:
        bit_group = ET.SubElement(root, f'{{{NS}}}g')
        bit_group.set('id', '_x38_bit_paths')

    # ========== Phase 1: Rasterize all countries to global grid ==========

    grid = np.zeros((GRID_H, GRID_W), dtype=np.int16)
    country_idx = {}    # code -> index
    idx_country = {}    # index -> code
    next_idx = 1

    to_process = sorted(k for k in original_paths if k not in SKIP_COUNTRIES)

    # Pre-compute bounding box areas so we can process SMALLEST countries first.
    # This ensures small countries (Luxembourg, Slovakia, etc.) claim their cells
    # before larger neighbors fill over them.
    print("  Pre-computing country sizes...")
    country_areas = {}
    country_sampled = {}  # cache sampled points
    for code in to_process:
        pts, subs = sample_subpaths(original_paths[code], 500)
        if pts:
            xs = [p[0] for p in pts]
            ys = [p[1] for p in pts]
            country_areas[code] = (max(xs) - min(xs)) * (max(ys) - min(ys))
            country_sampled[code] = (pts, subs)
        else:
            country_areas[code] = 0
            country_sampled[code] = ([], [])

    # Sort: smallest first, so small countries claim their cells before neighbors
    to_process_sorted = sorted(to_process, key=lambda c: country_areas.get(c, 0))

    print(f"Phase 1: Rasterizing {len(to_process_sorted)} vector countries + manual to {GRID_W}x{GRID_H} grid...")
    print(f"  (processing smallest→largest to protect small countries)")

    success = 0
    failed = []

    for code in to_process_sorted:
        country_idx[code] = next_idx
        idx_country[next_idx] = code
        if code == 'LK':
            # Shift Sri Lanka to avoid India overlap
            cells = rasterize_vector_to_grid(original_paths[code], grid, next_idx, dx=3, dy=12)
        else:
            cells = rasterize_vector_to_grid(original_paths[code], grid, next_idx)

        # Fallback for very small countries: force at least 1 cell at centroid
        if cells == 0:
            pts = country_sampled[code][0]
            if pts:
                cx = sum(p[0] for p in pts) / len(pts)
                cy = sum(p[1] for p in pts) / len(pts)
                if code == 'LK':
                    cx += 3
                    cy += 12
                col = int(cx / CELL_SIZE)
                row = int(cy / CELL_SIZE)
                if 0 <= row < GRID_H and 0 <= col < GRID_W:
                    if grid[row][col] == 0:
                        grid[row][col] = next_idx
                        cells = 1
                    else:
                        # Try adjacent cells
                        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0),
                                        (1, 1), (1, -1), (-1, 1), (-1, -1)]:
                            nr, nc = row + dr, col + dc
                            if 0 <= nr < GRID_H and 0 <= nc < GRID_W and grid[nr][nc] == 0:
                                grid[nr][nc] = next_idx
                                cells = 1
                                break

        if cells > 0:
            success += 1
        else:
            failed.append(code)
        next_idx += 1

    print(f"  {success}/{len(to_process)} vector countries rasterized")
    if failed:
        print(f"  Failed: {failed}")

    # Manual: Russia
    country_idx['RU'] = next_idx
    idx_country[next_idx] = 'RU'
    ru_cells = rasterize_polygon_to_grid(get_russia_points(), grid, next_idx)
    # Kaliningrad
    ru_cells += rasterize_rect_to_grid(525, 296, 10, 10, grid, next_idx)
    print(f"  RU: {ru_cells} cells (manual polygon + Kaliningrad)")
    next_idx += 1

    # Manual: Canada (processed AFTER US so Alaska cells are already claimed)
    country_idx['CA'] = next_idx
    idx_country[next_idx] = 'CA'
    ca_cells = rasterize_polygon_to_grid(get_canada_points(), grid, next_idx)
    print(f"  CA: {ca_cells} cells (manual polygon)")
    next_idx += 1

    # Manual: Hawaii (part of US - use the US index)
    us_idx = country_idx.get('US', 0)
    if us_idx:
        hi_cells = rasterize_polygon_to_grid(get_hawaii_points(), grid, us_idx)
        print(f"  HI: {hi_cells} cells (added to US)")

    # Manual: Seychelles
    country_idx['SC'] = next_idx
    idx_country[next_idx] = 'SC'
    sc_cells = rasterize_rect_to_grid(623, 494, 5, 4, grid, next_idx)
    print(f"  SC: {sc_cells} cells")
    next_idx += 1

    # ========== Phase 2: Trace outlines from global grid ==========

    print(f"\nPhase 2: Tracing outlines for {len(idx_country)} countries...")

    total_elements = 0
    country_codes_with_elements = set()

    for idx in sorted(idx_country.keys()):
        code = idx_country[idx]
        polygons = trace_country_from_grid(grid, idx)

        if not polygons:
            print(f"  WARNING: {code} - no polygons traced!")
            continue

        # Sort by area, largest first
        polygons.sort(key=polygon_area, reverse=True)
        largest_area = polygon_area(polygons[0])
        min_area = max(largest_area * 0.02, CELL_SIZE * CELL_SIZE * 1.5)

        part_idx = 0
        for polygon in polygons:
            if part_idx > 0 and polygon_area(polygon) < min_area:
                continue
            if part_idx >= 6:
                break
            eid = f'{code}1' if part_idx == 0 else f'{code}1_{part_idx}'
            if add_element(bit_group, eid, polygon):
                total_elements += 1
                if part_idx == 0:
                    country_codes_with_elements.add(code)
                part_idx += 1

    # ========== Phase 3: Output SVG ==========

    # Update CSS
    defs = root.find(f'{{{NS}}}defs')
    if defs is not None:
        style_elem = defs.find(f'{{{NS}}}style')
        if style_elem is not None:
            style_elem.text = """
      .st0, .st1, .st2 { stroke: #17b8bc; }
      .st3, .st1, .st2 { isolation: isolate; }
      .st1, .st2 { opacity: .28; }
      .st2 { fill: #ccc; }
      .st4, .st5 { display: none; }
      .country8 {
        fill: #d0d0d0;
        stroke: #444;
        stroke-width: 0.8;
        stroke-miterlimit: 10;
        cursor: pointer;
        transition: fill 0.15s ease;
      }
      .country8:hover { fill: #999; }
    """

    raw_xml = ET.tostring(root, encoding='unicode')
    output = '<?xml version="1.0" encoding="UTF-8"?>\n' + raw_xml

    with open(OUTPUT_FILE, 'w') as f:
        f.write(output)

    # ========== Verification ==========

    print(f"\nWritten to {OUTPUT_FILE}")
    print(f"Total SVG elements: {total_elements}")
    print(f"Unique countries: {len(country_codes_with_elements)}")

    print("\nOverlap verification:")
    verify_zero_overlap(grid)

    # Check adjacency for key borders
    print("\nBorder adjacency check:")
    key_borders = [
        ('US', 'CA', 'US-Canada'),
        ('US', 'MX', 'US-Mexico'),
        ('RU', 'FI', 'Russia-Finland'),
        ('RU', 'NO', 'Russia-Norway'),
        ('RU', 'CN', 'Russia-China'),
        ('RU', 'KZ', 'Russia-Kazakhstan'),
        ('RU', 'MN', 'Russia-Mongolia'),
        ('RU', 'UA', 'Russia-Ukraine'),
        ('FR', 'DE', 'France-Germany'),
        ('FR', 'ES', 'France-Spain'),
        ('IN', 'CN', 'India-China'),
        ('IN', 'PK', 'India-Pakistan'),
        ('BR', 'AR', 'Brazil-Argentina'),
    ]
    for c1, c2, name in key_borders:
        idx1 = country_idx.get(c1, 0)
        idx2 = country_idx.get(c2, 0)
        if idx1 == 0 or idx2 == 0:
            print(f"  {name}: MISSING ({c1 if idx1 == 0 else c2} not on grid)")
            continue
        # Check if any cells of c1 are adjacent to cells of c2
        cells1 = set(map(tuple, np.argwhere(grid == idx1)))
        cells2 = set(map(tuple, np.argwhere(grid == idx2)))
        touching = False
        for r, c in cells1:
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                if (r + dr, c + dc) in cells2:
                    touching = True
                    break
            if touching:
                break
        status = "TOUCHING" if touching else "GAP"
        print(f"  {name}: {status}")

    # Key country vertex counts
    print("\nKey country detail:")
    bg = root.find(f'.//{{{NS}}}g[@id="_x38_bit_paths"]')
    for elem in bg:
        eid = elem.get('id', '')
        if eid in ('US1', 'US1_1', 'US1_2', 'CA1', 'RU1', 'AU1', 'IN1', 'BR1', 'MX1'):
            pts = elem.get('points', '')
            if pts:
                verts = len(pts.split()) // 2
                print(f"  {eid}: {verts} vertices")
            else:
                print(f"  {eid}: rect")


if __name__ == '__main__':
    main()
