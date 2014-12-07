class PortfolioController < ApplicationController
  def sudoku
    @solution = ""
    if request.post?
      @solver = SudokuSolver.new params[:puzzle]
      @solver.parse!
      @solver.solve!
      @solution = @solver.to_s
    end
  end

  def expense
  end

  def interpreter
  end
end
