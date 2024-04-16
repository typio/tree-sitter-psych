package tree_sitter_psych_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-psych"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_psych.Language())
	if language == nil {
		t.Errorf("Error loading Psych grammar")
	}
}
