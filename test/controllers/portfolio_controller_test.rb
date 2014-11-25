require 'test_helper'

class PortfolioControllerTest < ActionController::TestCase
  test "should get sudoku" do
    get :sudoku
    assert_response :success
  end

  test "should get expense" do
    get :expense
    assert_response :success
  end

  test "should get interpreter" do
    get :interpreter
    assert_response :success
  end

end
