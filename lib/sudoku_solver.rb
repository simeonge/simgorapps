# Sudoku Solver: Given a text file representing an unsolved Sudoku puzzle, solves the puzzle and outputs it using the brute-force algorithm.
# Author: Simeon Georgiev

# Class that acts as a solver for puzzle given in a file
class SudokuSolver
  # initialize puzzle array
  def initialize puzzle_text
    @puzz_s = puzzle_text # get string with puzzle
    @puzzle = Array.new 9 # array of size 9
    @puzzle.fill {|i| i = []} # array of 9 (initially) empty arrays
  end
  
  # Parses the input file and produces a two-dimensional array representing the puzzle
  def parse!
    i, line_num = 0, 1
    begin
        @puzz_s.split("\n").each do |line| # for each line
          line.chomp! # remove trailing \n
          # enforce formatting with abort and regex
          abort "Invalid file" if line_num > 11
          if (line_num != 4 && line_num != 8) # skip these lines
            abort "Invalid file" if line !~ /^([1-9]|\.){3}(\|([1-9]|\.){3}){2}$/
            # remove | from line, iterate thourgh it and add numbers to array
            line.gsub!(/\|/, "").each_char {|ch| @puzzle[i].push(ch =~ /\d/ ? ch.to_i : 0)}
            i += 1 # inc index
          else
            abort "Invalid file" if line !~ /^-----------$/
          end
          line_num += 1 # inc line number
        end
    rescue # if file doesn't exist or can't be read
      abort "Error opening or reading file!"
    end
    abort "Invalid puzzle" if !valid_puzzle?
  end
  
  # Solves the sudoku puzzle
  def solve!
    fill_grid @puzzle.flatten # recursively attempt all possibilities, filling the grid
  end

  # Converts the two-dimensional array to a well-formatted string, ready for output to the console
  def to_s
    i, j = 0, 0 # counter
    @puzzle.reduce("") do |st, row| 
      i += 1; se = i % 3 == 0 && i % 9 != 0 ? "\n-----------------\n" : "\n"
      st += row.reduce("") { |tx, num|
        j += 1; sp = j % 3 == 0 && j % 9 != 0 ? "|" : j % 9 == 0 ? "" : " "
        tx += num.to_s + sp} + se
    end
  end
  
  private # all subsequent methods are private
  
  # Uses recursion and backtracking to try all possibilities, filling the grid
  def fill_grid grid
    if !solved? # if not yet solved
      empty = grid.find_index {|i| i == 0} # get first empty      
      nums = row_nums(empty) & col_nums(empty) & reg_nums(empty) # get poss. digits for empty

      # iterate recursively through all empties and all possible digits for each empty
      # this tries all possible options, backtracking if the next square has no possible numbers
      nums.each_with_index do |num, index|
        grid[empty] = num # put number in empty
        
        # update @puzzle, because methods that get possible digits use @puzzle
        @puzzle.clear
        grid.each_slice(9) {|row| @puzzle << row}
                
        fill_grid grid # recursive call
        if  !solved?
          # if not solved after last number entered, previous entries are wrong
          # setting empty to 0 will force method to backtrack and recur again w/ diff. combination
          grid[empty] = 0 if index == nums.size-1
        else
          return # solution found; exit method
        end
      end # end block
    end # end if
  end

  # Returns true if puzzle is solved, false otherwise
  def solved?
    # Sufficient because the algorithm doesn't put add any numbers if they're already
    # in a row, column, or box. This means we just need to make sure there are no blank
    # squares. Adding up all numbers in all the rows is sufficient; they cannot add up
    # to 45 if there are blank squares
    @puzzle.reduce {|ans, row| ans &&= (row.reduce {|sum, num| sum += num} == 45)}
  end

  # Returns array of acceptable nums for the row
  def row_nums index
    nums = [] # array of acceptable numbers
    for i in 1..9 # look for all the digits
      case index
      when 0...9
        nums << i if !@puzzle[0].include? i
      when 9...18
        nums << i if !@puzzle[1].include? i
      when 18...27
        nums << i if !@puzzle[2].include? i
      when 27...36
        nums << i if !@puzzle[3].include? i
      when 36...45
        nums << i if !@puzzle[4].include? i
      when 45...54
        nums << i if !@puzzle[5].include? i
      when 54...63
        nums << i if !@puzzle[6].include? i
      when 63...72
        nums << i if !@puzzle[7].include? i
      when 72...81
        nums << i if !@puzzle[8].include? i
      end
    end
    return nums
  end

  # Returns array of acceptable nums for column
  def col_nums index
    nums = []
    for i in 1..9 # look for all the digits
      col = []
      @puzzle.each {|row| col << row[index % 9]}
      nums << i if !col.include? i
    end
    return nums
  end

  # Returns array of acceptable nums for the box
  def reg_nums index
    nums = []
    for i in 1..9 # look for all the digits
      m = index % 9
      if (0...3) === m && (0...27) === index # quadrant 1
        box = @puzzle[0][0, 3] + @puzzle[1][0, 3] + @puzzle[2][0, 3]
      elsif (3...6) === m && (0...27) === index # quadrant 2
        box = @puzzle[0][3, 3] + @puzzle[1][3, 3] + @puzzle[2][3, 3]
      elsif (6...9) === m && (0...27) === index # quadrant 3
        box = @puzzle[0][6, 3] + @puzzle[1][6, 3] + @puzzle[2][6, 3]
      elsif (0...3) === m && (27...54) === index # quad 4
        box = @puzzle[3][0, 3] + @puzzle[4][0, 3] + @puzzle[5][0, 3]
      elsif (3...6) === m && (27...54) === index # quad 5
        box = @puzzle[3][3, 3] + @puzzle[4][3, 3] + @puzzle[5][3, 3]
      elsif (6...9) === m && (27...54) === index # quad 6
        box = @puzzle[3][6, 3] + @puzzle[4][6, 3] + @puzzle[5][6, 3]
      elsif (0...3) === m && (54...81) === index # quad 7
        box = @puzzle[6][0, 3] + @puzzle[7][0, 3] + @puzzle[8][0, 3]
      elsif (3...6) === m && (54...81) === index # quad 8
        box = @puzzle[6][3, 3] + @puzzle[7][3, 3] + @puzzle[8][3, 3]
      elsif (6...9) === m && (54...81) === index # quad 9
        box = @puzzle[6][6, 3] + @puzzle[7][6, 3] + @puzzle[8][6, 3]
      end
      nums << i if !box.include? i # add number to array
    end
    return nums
  end

  # Returns true if initial puzzle is valid, false otherwise
  def valid_puzzle?
    valid = false
    # check rows for duplicates
    @puzzle.each do |row|
      te = row.reject {|num| num == 0} # remove zeroes
      valid = te.uniq.size == te.size # not valid if there are dupes
    end

    # check columns for duplicates
    9.times do |i| # for columns 0 thru 8
      col = [] # column
      @puzzle.each {|row| col << row[i]} # fill column
      col.reject! {|num| num == 0} # remove zeroes
      valid = col.uniq.size == col.size # check dupes
    end

    # check boxes for duplicates
    puz = []
    puz << @puzzle[0][0, 3] + @puzzle[1][0, 3] + @puzzle[2][0, 3]
    puz << @puzzle[0][3, 3] + @puzzle[1][3, 3] + @puzzle[2][3, 3]
    puz << @puzzle[0][6, 3] + @puzzle[1][6, 3] + @puzzle[2][6, 3]
    puz << @puzzle[3][0, 3] + @puzzle[4][0, 3] + @puzzle[5][0, 3]
    puz << @puzzle[3][3, 3] + @puzzle[4][3, 3] + @puzzle[5][3, 3]
    puz << @puzzle[3][6, 3] + @puzzle[4][6, 3] + @puzzle[5][6, 3]
    puz << @puzzle[6][0, 3] + @puzzle[7][0, 3] + @puzzle[8][0, 3]
    puz << @puzzle[6][3, 3] + @puzzle[7][3, 3] + @puzzle[8][3, 3]
    puz << @puzzle[6][6, 3] + @puzzle[7][6, 3] + @puzzle[8][6, 3]

    puz.each do |box| # for all boxes
      box.reject! {|num| num == 0} # remove zeroes
      valid = box.uniq.size == box.size # check dupes
    end

    return valid
  end

  # More robust solved method, checks all rows, cols, and boxs for dupes
=begin
  # Return true if puzzle is solved, false otherwise
  def solved?
    solved = true
    # check rows for duplicates
    @puzzle.each do |row|
      te = row.reject {|num| num == 0} # remove zeroes
      solved = false if te.uniq.size != 9 # not valid if there are dupes
    end

    # check columns for duplicates
    9.times do |i| # for columns 0 thru 8
      col = [] # column
      @puzzle.each {|row| col << row[i]} # fill column
      col.reject! {|num| num == 0} # remove zeroes
      solved = false if col.uniq.size != 9
    end

    # check boxes for duplicates
    puz = []
    puz << @puzzle[0][0, 3] + @puzzle[1][0, 3] + @puzzle[2][0, 3]
    puz << @puzzle[0][3, 3] + @puzzle[1][3, 3] + @puzzle[2][3, 3]
    puz << @puzzle[0][6, 3] + @puzzle[1][6, 3] + @puzzle[2][6, 3]
    puz << @puzzle[3][0, 3] + @puzzle[4][0, 3] + @puzzle[5][0, 3]
    puz << @puzzle[3][3, 3] + @puzzle[4][3, 3] + @puzzle[5][3, 3]
    puz << @puzzle[3][6, 3] + @puzzle[4][6, 3] + @puzzle[5][6, 3]
    puz << @puzzle[6][0, 3] + @puzzle[7][0, 3] + @puzzle[8][0, 3]
    puz << @puzzle[6][3, 3] + @puzzle[7][3, 3] + @puzzle[8][3, 3]
    puz << @puzzle[6][6, 3] + @puzzle[7][6, 3] + @puzzle[8][6, 3]

    puz.each do |box|
      box.reject! {|num| num == 0} # remove zeroes
      solved = false if box.uniq.size != 9
    end

    return solved
  end
=end

end
