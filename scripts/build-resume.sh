#!/usr/bin/env bash
set -e

SRC="resume/resume.tex"
OUT="public/resume.pdf"

echo "=== Resume PDF Builder ==="

if command -v xelatex >/dev/null 2>&1; then
  echo "📄 Compiling $SRC with xelatex..."
  TMP_DIR=$(mktemp -d)
  (cd resume && xelatex -interaction=nonstopmode -output-directory="$TMP_DIR" resume.tex)
  cp "$TMP_DIR/resume.pdf" "$OUT"
  rm -rf "$TMP_DIR"
  echo "✓ Successfully compiled $OUT using xelatex."
elif command -v pdflatex >/dev/null 2>&1; then
  echo "📄 Compiling $SRC with pdflatex..."
  TMP_DIR=$(mktemp -d)
  (cd resume && pdflatex -interaction=nonstopmode -output-directory="$TMP_DIR" resume.tex)
  cp "$TMP_DIR/resume.pdf" "$OUT"
  rm -rf "$TMP_DIR"
  echo "✓ Successfully compiled $OUT using pdflatex."
else
  echo "ℹ️ Note: Neither xelatex nor pdflatex is currently installed in this environment."
  echo "   - resume/resume.tex is ready in the repository."
  echo "   - CI/CD automatically compiles this via xu-cheng/latex-action on deployment."
  echo "   - Once compiled, place the generated PDF at: $OUT"
  echo "   - A valid baseline PDF is currently already placed at: $OUT"
fi
