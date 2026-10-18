#!/usr/bin/env python3
"""Cut the figures of the lecture slides out of the PDFs: python3 tools/figures.py DIR_WITH_SLIDE_PDFS
Reads tools/figures.json (image, pdf, page, crop box in points of the page: x0, y0, x1, y1) and writes app/img/*.png."""
import json, subprocess, sys, tempfile, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
def main():
    if len(sys.argv) != 2: sys.exit(__doc__)
    pdfs = pathlib.Path(sys.argv[1])
    out = ROOT / 'app' / 'img'; out.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for f in json.loads((ROOT / 'tools' / 'figures.json').read_text(encoding='utf-8')):
            base = pathlib.Path(tmp) / 'page'
            subprocess.run(['pdftoppm', '-f', str(f['page']), '-l', str(f['page']), '-r', '200', '-png', '-singlefile', str(pdfs / f['pdf']), str(base)], check=True)
            page = str(base) + '.png'
            k = 200 / 72.0   # pixels per point at 200 dpi
            x0, y0, x1, y1 = f['crop']
            geo = '%dx%d+%d+%d' % (round((x1 - x0) * k), round((y1 - y0) * k), round(x0 * k), round(y0 * k))
            subprocess.run(['magick', page, '-crop', geo, '+repage', '-trim', '-bordercolor', 'white', '-border', '10', '-resize', '1100x>', '-strip', str(ROOT / 'app' / f['file'])], check=True)
            print(f['file'])
if __name__ == '__main__': main()
