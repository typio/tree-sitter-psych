; @text.literal      Comment
; @text.reference    Identifier
; @text.title        Title
; @text.uri          Underlined
; @text.underline    Underlined
; @text.todo         Todo
;
; @comment           Comment
; @punctuation       Delimiter
;
; @constant          Constant
; @constant.builtin  Special
; @constant.macro    Define
; @define            Define
; @macro             Macro
; @string            String
; @string.escape     SpecialChar
; @string.special    SpecialChar
; @character         Character
; @character.special SpecialChar
; @number            Number
; @boolean           Boolean
; @float             Float
;
; @function          Function
; @function.builtin  Special
; @function.macro    Macro
; @parameter         Identifier
; @method            Function
; @field             Identifier
; @property          Identifier
; @constructor       Special
;
; @conditional       Conditional
; @repeat            Repeat
; @label             Label
; @operator          Operator
; @keyword           Keyword
; @exception         Exception
;
; @variable          Identifier
; @type              Type
; @type.definition   Typedef
; @storageclass      StorageClass
; @structure         Structure
; @namespace         Identifier
; @include           Include
; @preproc           PreProc
; @debug             Debug
; @tag               Tag

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
  ","
] @punctuation.delimiter


; Comments

[
  (comment)
] @comment @spell

; Variables

(identifier) @variable

; Literals

(number) @number

(float) @float

(string) @string

(char) @character

(bool) @boolean

; Declaration

(constant_declaration (identifier) @type "::" );[(array_type) (distinct_type) (bit_set_type) (pointer_type)])

; Parameters

(parameter_list (identifier) @parameter)

; Functions

(function_definition (identifier) @function)

(function_definition (identifier) @function)

; (call_expression function: (identifier) @function.call)


; Operators

[
  "="
  ":"
  "="
  "+"
  "-"
  "*"
  "/"
  ">"
  ">="
  "<"
  "<="
  "=="
  "|>"
] @operator
