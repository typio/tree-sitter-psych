module.exports = grammar({
  name: "psych",
  rules: {
    source_file: ($) => repeat($.statement),

    definition: ($) => choice($.function_definition),

    function_definition: ($) =>
      seq("func", $.identifier, $.parameter_list, $.type, $.block),

    parameter_list: (_) => seq("(", ")"),

    base_type: (_) =>
      choice(
        "bool",
        "char",
        "string",
        seq("i", /\d+/),
        seq("u", /\d+/),
        "f16",
        "f32",
      ),

    type: ($) =>
      seq(
        optional("&"),
        optional(
          seq(
            "[",
            optional(seq(/\d+/, repeat(seq(",", /\d+/)), optional(","))),
            "]",
          ),
        ),
        $.base_type,
      ),

    block: ($) => seq("{", repeat($.statement), "}"),

    statement: ($) => choice($.expression_statement, $.return_statement),

    expression_statement: ($) =>
      choice(
        $.variable_declaration,
        $.constant_declaration,
        $.assignment_expression,
      ),

    constant_declaration: ($) =>
      seq($.identifier, ":", optional($.type), ":", $.literal),

    variable_declaration: ($) =>
      seq($.identifier, ":", optional($.type), "=", $.literal),

    assignment_expression: ($) => seq($.identifier, "=", $.literal),

    return_statement: ($) => seq("return", $.expression, ";"),

    expression: ($) => choice($.identifier, $.literal),

    identifier: (_) => /[_a-zA-Z][_a-zA-Z0-9]*/,

    literal: ($) => choice($.number, $.char, $.string, $.bool, $.array),

    number: (_) => choice(/\d+/, /(\d+[.]\d+)/),

    char: (_) => seq("'", /([^'\\]|\\.)/, "'"),

    string: (_) => seq('"', /([^"\\]|\\.)*/, '"'),

    bool: (_) => choice("true", "false"),

    array: ($) =>
      seq(
        "[",
        optional(seq($.literal, repeat(seq(",", $.literal)), optional(","))),
        "]",
      ),

    comment: (_) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
  extras: ($) => [/\s/, $.comment],
});
