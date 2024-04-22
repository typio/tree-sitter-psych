; Includes

[
  "import"
] @include

; Keywords

[
  "defer"
] @keyword

[
  "return"
] @keyword.return

; Conditionals

[
  "if"
  "else"
  "match"
  ; (fallthrough_statement)
] @conditional

; Punctuation

[ "{" "}" ] @punctuation.bracket

[ "(" ")" ] @punctuation.bracket

[ "[" "]" ] @punctuation.bracket

[
  "::"
  "->"
  ","
] @punctuation.delimiter


; Comments

[
  (comment)
] @comment @spell

