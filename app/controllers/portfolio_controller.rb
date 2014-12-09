class PortfolioController < ApplicationController
  def sudoku
    @solution = ""
    if request.post?
      @solver = SudokuSolver.new params[:puzzle]
      @solver.parse!
      @solver.solve!
      @solution = @solver.to_s
      # return solution as json
      respond_to do |format|
        format.json { render json: @solution }
      end
    end
  end

  def expense
  end

  def interpreter
  end
end
