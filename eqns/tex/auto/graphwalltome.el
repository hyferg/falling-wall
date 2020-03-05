(TeX-add-style-hook
 "graphwalltome"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("eucal" "mathscr") ("geometry" "margin=0.7in")))
   (TeX-run-style-hooks
    "latex2e"
    "article"
    "art10"
    "amsxtra"
    "amssymb"
    "amsfonts"
    "amsmath"
    "amsthm"
    "latexsym"
    "eucal"
    "epsfig"
    "graphicx"
    "mathabx"
    "upgreek"
    "geometry")
   (TeX-add-symbols
    "E"
    "R"
    "ind")
   (LaTeX-add-amsthm-newtheorems
    "theorem"
    "proposition"
    "lemma"
    "corollary"
    "definition"
    "condition"
    "hypothesis"
    "remark"
    "example"
    "conjecture"))
 :latex)

