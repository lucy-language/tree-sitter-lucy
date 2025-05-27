import XCTest
import SwiftTreeSitter
import TreeSitterLucy

final class TreeSitterLucyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lucy())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Lucy grammar")
    }
}
