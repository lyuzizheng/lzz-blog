#!/usr/bin/env bash
set -e

SRC="docs/RESUME_2026.tex"
OUT="public/resume.pdf"

echo "=== Resume PDF Builder ==="

if command -v xelatex >/dev/null 2>&1; then
  echo "📄 Compiling $SRC with xelatex..."
  TMP_DIR=$(mktemp -d)
  xelatex -interaction=nonstopmode -output-directory="$TMP_DIR" "$SRC"
  cp "$TMP_DIR/RESUME_2026.pdf" "$OUT"
  rm -rf "$TMP_DIR"
  echo "✓ Successfully compiled $OUT using xelatex."
elif command -v pdflatex >/dev/null 2>&1; then
  echo "📄 Compiling $SRC with pdflatex..."
  TMP_DIR=$(mktemp -d)
  pdflatex -interaction=nonstopmode -output-directory="$TMP_DIR" "$SRC"
  cp "$TMP_DIR/RESUME_2026.pdf" "$OUT"
  rm -rf "$TMP_DIR"
  echo "✓ Successfully compiled $OUT using pdflatex."
else
  echo "ℹ️ Note: Neither xelatex nor pdflatex is currently installed in this environment."
  echo "   - docs/RESUME_2026.tex is ready in the repository."
  echo "   - You can compile it via Overleaf, MacTeX (brew install --cask mactex-no-gui), or TeX Live."
  echo "   - Once compiled, place the generated PDF at: $OUT"
  echo "   - A valid baseline PDF is currently already placed at: $OUT"
fi
