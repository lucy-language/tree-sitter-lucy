package tree_sitter_lucy_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lucy "github.com/lucy-language/tree-sitter-lucy/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lucy.Language())
	if language == nil {
		t.Errorf("Error loading Lucy grammar")
	}
}
