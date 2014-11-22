require 'test_helper'

class CalculatorControllerTest < ActionController::TestCase
  test "should get calc" do
    get :calc
    assert_response :success
  end

end
