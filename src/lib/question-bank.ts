interface ExcelQuestion {
  id: number;
  question: string;
  category: "formulas" | "functions" | "dataAnalysis" | "bestPractices";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  constraints: {
    dataSize?: string;
    excelVersion?: string;
    assumptions?: string[];
    limitations?: string[];
  };
  hints: {
    approach?: string;
    functions?: string[];
    concepts?: string[];
  };
}

interface QuestionSelectionInfo {
  id: number;
  category: "formulas" | "functions" | "dataAnalysis" | "bestPractices";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  title: string;
}

export const getQuestionSelectionInfo = (
  questions: ExcelQuestion[]
): QuestionSelectionInfo[] =>
  questions.map((q) => ({
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    title:
      q.question.length > 80 ? q.question.substring(0, 77) + "..." : q.question,
  }));

export const EXCEL_QUESTIONS: ExcelQuestion[] = [
  // BEGINNER LEVEL (4 questions)
  {
    id: 1,
    question:
      "How would you calculate the sum of values in cells A1 through A10? Explain the formula you would use.",
    category: "formulas",
    difficulty: "Beginner",
    constraints: {
      dataSize: "Assume 10 numeric values in consecutive cells",
      excelVersion: "Any Excel version",
      assumptions: ["Cells contain only numbers", "No blank cells in range"],
      limitations: ["Use basic SUM function only"],
    },
    hints: {
      approach: "Think about Excel's basic arithmetic functions",
      functions: ["SUM"],
      concepts: ["Cell ranges", "Function syntax"],
    },
  },
  {
    id: 2,
    question:
      "What's the difference between relative and absolute cell references? Give an example of when you'd use each.",
    category: "formulas",
    difficulty: "Beginner",
    constraints: {
      excelVersion: "Any Excel version",
      assumptions: ["Basic understanding of cell references"],
      limitations: ["Focus on $ symbol usage"],
    },
    hints: {
      approach: "Consider what happens when you copy formulas",
      functions: [],
      concepts: ["$ symbol", "Cell reference behavior", "Formula copying"],
    },
  },
  {
    id: 3,
    question:
      "How would you count the number of cells that contain data in a range B1:B50?",
    category: "functions",
    difficulty: "Beginner",
    constraints: {
      dataSize: "50-cell range with mixed data and blanks",
      excelVersion: "Excel 2010 or newer",
      assumptions: ["Some cells are empty", "Data can be text or numbers"],
      limitations: ["Use built-in COUNT functions only"],
    },
    hints: {
      approach: "Consider functions that count non-empty cells",
      functions: ["COUNTA", "COUNT", "COUNTBLANK"],
      concepts: ["Difference between COUNT and COUNTA"],
    },
  },
  {
    id: 4,
    question:
      "Explain how you would format cells to display numbers as currency with two decimal places.",
    category: "bestPractices",
    difficulty: "Beginner",
    constraints: {
      excelVersion: "Excel 2016 or newer",
      assumptions: ["Numbers already exist in cells"],
      limitations: ["Use built-in formatting options"],
    },
    hints: {
      approach: "Think about cell formatting options",
      functions: [],
      concepts: ["Number formatting", "Currency symbols", "Decimal places"],
    },
  },

  // INTERMEDIATE LEVEL (4 questions)
  {
    id: 5,
    question:
      "You have a table with employee names in column A and their salaries in column B (rows 2-100). How would you find the salary of a specific employee using their name?",
    category: "functions",
    difficulty: "Intermediate",
    constraints: {
      dataSize: "100 rows of employee data",
      excelVersion: "Excel 2013 or newer",
      assumptions: [
        "Headers in row 1",
        "No duplicate names",
        "Employee name is exact match",
      ],
      limitations: ["Data range is A2:B100", "No VBA or advanced features"],
    },
    hints: {
      approach: "Consider lookup functions that search by text",
      functions: ["VLOOKUP", "INDEX", "MATCH"],
      concepts: ["Table lookup", "Exact match", "Column references"],
    },
  },
  {
    id: 6,
    question:
      "How would you create a formula that shows 'Pass' if a student's score is 60 or above, and 'Fail' if below 60?",
    category: "functions",
    difficulty: "Intermediate",
    constraints: {
      dataSize: "Scores range from 0-100",
      excelVersion: "Any Excel version",
      assumptions: ["Score is a numeric value", "Pass threshold is exactly 60"],
      limitations: ["Use logical functions only"],
    },
    hints: {
      approach: "Think about conditional logic functions",
      functions: ["IF"],
      concepts: ["Logical operators", "Text output", "Conditional statements"],
    },
  },
  {
    id: 7,
    question:
      "You need to calculate the total sales for 'Product A' from a sales data table. The product names are in column C and sales amounts in column D (rows 2-500). What formula would you use?",
    category: "functions",
    difficulty: "Intermediate",
    constraints: {
      dataSize: "500 rows of sales data",
      excelVersion: "Excel 2007 or newer",
      assumptions: [
        "Headers in row 1",
        "Product names are exact text matches",
        "Sales amounts are numbers",
      ],
      limitations: ["Data range C2:D500", "No pivot tables"],
    },
    hints: {
      approach: "Consider functions that sum based on criteria",
      functions: ["SUMIF", "SUMIFS"],
      concepts: ["Conditional summing", "Text criteria", "Range references"],
    },
  },
  {
    id: 8,
    question:
      "How would you prevent users from entering invalid data in a cell (e.g., only allow numbers between 1-100)?",
    category: "bestPractices",
    difficulty: "Intermediate",
    constraints: {
      excelVersion: "Excel 2010 or newer",
      assumptions: [
        "Users should only enter whole numbers",
        "Range is inclusive (1 and 100 are valid)",
      ],
      limitations: ["Use built-in Excel features only"],
    },
    hints: {
      approach: "Consider Excel's data validation features",
      functions: [],
      concepts: ["Data validation", "Input restrictions", "Error messages"],
    },
  },

  // ADVANCED LEVEL (4 questions)
  {
    id: 9,
    question:
      "You have a large dataset (10,000+ rows) with employee data including departments and salaries. How would you create a summary showing average salary by department without using pivot tables?",
    category: "dataAnalysis",
    difficulty: "Advanced",
    constraints: {
      dataSize: "10,000+ rows of employee data",
      excelVersion: "Excel 2016 or newer",
      assumptions: [
        "Departments in column B",
        "Salaries in column C",
        "Some departments repeat",
      ],
      limitations: [
        "No pivot tables",
        "No VBA",
        "Must handle large dataset efficiently",
      ],
    },
    hints: {
      approach:
        "Consider functions that can handle multiple criteria and large datasets",
      functions: ["AVERAGEIF", "AVERAGEIFS", "UNIQUE", "SUMPRODUCT"],
      concepts: [
        "Conditional averaging",
        "Array formulas",
        "Performance optimization",
      ],
    },
  },
  {
    id: 10,
    question:
      "Explain how you would use INDEX and MATCH together to perform a two-way lookup in a table. Give a practical example.",
    category: "functions",
    difficulty: "Advanced",
    constraints: {
      dataSize: "Table with multiple rows and columns",
      excelVersion: "Excel 2013 or newer",
      assumptions: [
        "Row headers in column A",
        "Column headers in row 1",
        "Need to find intersection value",
      ],
      limitations: [
        "Must use INDEX/MATCH combination",
        "No VLOOKUP or XLOOKUP",
      ],
    },
    hints: {
      approach: "Think about how to find both row and column positions",
      functions: ["INDEX", "MATCH"],
      concepts: [
        "Two-dimensional lookup",
        "Array intersection",
        "Nested functions",
      ],
    },
  },
  {
    id: 11,
    question:
      "How would you create a dynamic named range that automatically expands as new data is added to a list?",
    category: "bestPractices",
    difficulty: "Advanced",
    constraints: {
      excelVersion: "Excel 2010 or newer",
      assumptions: [
        "Data is in a continuous column",
        "New data added at the bottom",
        "No gaps in data",
      ],
      limitations: ["Must be truly dynamic", "No VBA or macros"],
    },
    hints: {
      approach:
        "Consider functions that can determine data range automatically",
      functions: ["OFFSET", "COUNTA", "INDIRECT"],
      concepts: ["Dynamic ranges", "Named ranges", "Automatic expansion"],
    },
  },
  {
    id: 12,
    question:
      "You need to extract all unique values from a column containing duplicates (5000+ entries). What's the most efficient approach in Excel?",
    category: "dataAnalysis",
    difficulty: "Advanced",
    constraints: {
      dataSize: "5000+ entries with many duplicates",
      excelVersion: "Excel 2016 or newer (with Office 365 features)",
      assumptions: [
        "Data is in single column",
        "Mix of text and numbers",
        "Need complete unique list",
      ],
      limitations: [
        "Must handle large dataset efficiently",
        "Consider both legacy and modern Excel features",
      ],
    },
    hints: {
      approach: "Consider both traditional and modern Excel approaches",
      functions: ["UNIQUE", "Remove Duplicates", "Advanced Filter"],
      concepts: [
        "Data deduplication",
        "Performance with large datasets",
        "Modern vs traditional methods",
      ],
    },
  },

  // EXPERT LEVEL (4 questions)
  {
    id: 13,
    question:
      "How would you create a complex nested formula that counts unique values in a range based on multiple criteria without using helper columns?",
    category: "functions",
    difficulty: "Expert",
    constraints: {
      dataSize: "Large dataset with multiple columns",
      excelVersion: "Excel 2019 or Office 365",
      assumptions: [
        "Multiple criteria columns",
        "Need unique count not just count",
        "No helper columns allowed",
      ],
      limitations: [
        "Single formula solution",
        "No VBA",
        "Must be array formula or use modern functions",
      ],
    },
    hints: {
      approach: "Consider array formulas or new dynamic array functions",
      functions: ["SUMPRODUCT", "COUNTIFS", "FREQUENCY", "UNIQUE", "FILTER"],
      concepts: [
        "Array formulas",
        "Unique counting logic",
        "Multiple criteria handling",
      ],
    },
  },
  {
    id: 14,
    question:
      "Describe how you would set up a rolling 12-month analysis that automatically updates as new monthly data is added, including handling for incomplete years.",
    category: "dataAnalysis",
    difficulty: "Expert",
    constraints: {
      dataSize: "Several years of monthly data",
      excelVersion: "Excel 2016 or newer",
      assumptions: [
        "Monthly data in chronological order",
        "New data added monthly",
        "Need rolling window",
        "Handle partial years",
      ],
      limitations: [
        "Must be fully automated",
        "Handle date calculations",
        "Account for data gaps",
      ],
    },
    hints: {
      approach: "Consider dynamic date ranges and automated formulas",
      functions: ["OFFSET", "EOMONTH", "TODAY", "INDIRECT", "SUMIFS"],
      concepts: [
        "Rolling windows",
        "Dynamic date calculations",
        "Automated reporting",
      ],
    },
  },
  {
    id: 15,
    question:
      "How would you design a Excel model that can handle scenario analysis with multiple variables and show sensitivity analysis results?",
    category: "dataAnalysis",
    difficulty: "Expert",
    constraints: {
      excelVersion: "Excel 2016 or newer",
      assumptions: [
        "Multiple input variables",
        "Complex calculations",
        "Need scenario comparison",
        "Professional presentation",
      ],
      limitations: [
        "Use Excel native features",
        "No third-party add-ins",
        "Must be maintainable",
      ],
    },
    hints: {
      approach: "Consider Excel's scenario and analysis tools",
      functions: [
        "Data Tables",
        "Scenario Manager",
        "Goal Seek",
        "What-If Analysis",
      ],
      concepts: [
        "Sensitivity analysis",
        "Scenario modeling",
        "Data tables",
        "Professional modeling practices",
      ],
    },
  },
  {
    id: 16,
    question:
      "Explain how you would optimize a slow-performing Excel file with 50,000+ rows of data and complex formulas. What specific techniques would you use?",
    category: "bestPractices",
    difficulty: "Expert",
    constraints: {
      dataSize: "50,000+ rows with performance issues",
      excelVersion: "Excel 2016 or newer",
      assumptions: [
        "Complex formulas causing slowness",
        "File used by multiple users",
        "Need to maintain functionality",
      ],
      limitations: [
        "Must maintain existing functionality",
        "Consider user experience",
        "File size constraints",
      ],
    },
    hints: {
      approach:
        "Consider formula optimization, calculation settings, and file structure",
      functions: [
        "Array formulas",
        "Volatile functions",
        "INDEX/MATCH vs VLOOKUP",
      ],
      concepts: [
        "Calculation optimization",
        "Memory management",
        "Formula efficiency",
        "File structure",
      ],
    },
  },
];
