export const questionPool = [
    // Basic Programming (BTL 1)
    {
      id: 1,
      text: 'Which of the following is the correct syntax to print "Hello World" in C?',
      options: [
        'System.out.println("Hello World");',
        'printf("Hello World");',
        'cout << "Hello World";',
        'echo "Hello World";',
      ],
      correct: 'printf("Hello World");',
      btl_level: 1,
      topicId: 'p1', // Basic Programming
    },
    {
      id: 2,
      text: "Which of these is not a valid C++ access specifier?",
      options: ["public", "private", "protected", "friendly"],
      correct: "friendly",
      btl_level: 1,
      topicId: 'p1', // Basic Programming (Access specifiers are syntax/structure)
    },
    {
      id: 3,
      text: "In C++, the default return type of the main() function is:",
      options: ["void", "int", "float", "char"],
      correct: "int",
      btl_level: 1,
      topicId: 'p5', // Functions (Main function)
    },
    {
      id: 4,
      text: "Which symbol is used for single-line comments in C++ and Java?",
      options: ["/* */", "//", "#", "<!-- -->"],
      correct: "//",
      btl_level: 1,
      topicId: 'p1', // Basic Programming
    },
    {
      id: 5,
      text: "Which of these statements is true about Java?",
      options: [
        "Java code can run without compilation",
        "Java is platform-independent",
        "Java does not support OOP",
        "Java does not have loops",
      ],
      correct: "Java is platform-independent",
      btl_level: 1,
      topicId: 'p1', // Basic Programming
    },
    {
      id: 6,
      text: "Which keyword is used to define a variable in Java?",
      options: ["let", "var", "int", "define"],
      correct: "int",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 7,
      text: "Which of the following is a valid C data type?",
      options: ["number", "float", "decimal", "real"],
      correct: "float",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 8,
      text: "What is the size of int data type in most 32-bit C/C++ compilers?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      correct: "4 bytes",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 9,
      text: "Which of the following is a floating-point data type?",
      options: ["int", "char", "double", "boolean"],
      correct: "double",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 10,
      text: "Which data type is used to store a single character?",
      options: ["int", "char", "string", "float"],
      correct: "char",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 11,
      text: "What is the default value of a static int variable in C++?",
      options: ["0", "Garbage", "1", "Undefined"],
      correct: "0",
      btl_level: 1,
      topicId: 'p2', // Data Types (static vars)
    },
    {
      id: 12,
      text: "Which of the following is a boolean value in C++?",
      options: ["1", "true", '"true"', "yes"],
      correct: "true",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 13,
      text: "Which of these types is used for storing large integers in Java?",
      options: ["int", "long", "short", "byte"],
      correct: "long",
      btl_level: 1,
      topicId: 'p2', // Data Types
    },
    {
      id: 14,
      text: "An array in C starts with index number:",
      options: ["0", "1", "-1", "Depends on compiler"],
      correct: "0",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 15,
      text: "How many elements does int arr[10]; hold?",
      options: ["9", "10", "11", "Undefined"],
      correct: "10",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 16,
      text: "In Java, arrays are:",
      options: ["Primitive types", "Objects", "Functions", "Loops"],
      correct: "Objects",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 17,
      text: "Which of the following correctly declares an integer array of size 5 in C++?",
      options: [
        "int arr[5];",
        "int arr();",
        "int arr = new int[5];",
        "array<int> arr[5];",
      ],
      correct: "int arr[5];",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 18,
      text: "How can you access the third element of an array arr?",
      options: ["arr[2]", "arr[3]", "arr(3)", "arr.3"],
      correct: "arr[2]",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 19,
      text: "Which of the following is not allowed in arrays?",
      options: [
        "Accessing elements",
        "Storing different data types",
        "Looping through elements",
        "Initializing at declaration",
      ],
      correct: "Storing different data types",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 20,
      text: "Which of the following is multidimensional array syntax in C++?",
      options: [
        "int arr[3][4];",
        "int arr[3,4];",
        "int arr(3,4);",
        "array arr[3][4];",
      ],
      correct: "int arr[3][4];",
      btl_level: 1,
      topicId: 'p18', // Matrices (Multidimensional Arrays are matrices)
    },
    {
      id: 21,
      text: "Which of the following loops is guaranteed to run at least once?",
      options: [
        "for loop",
        "while loop",
        "do-while loop",
        "None of the above",
      ],
      correct: "do-while loop",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 22,
      text: "How do you skip the current iteration in a loop in C++/Java?",
      options: ["skip;", "continue;", "break;", "pass;"],
      correct: "continue;",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 23,
      text: "How do you terminate a loop prematurely in C++/Java?",
      options: ["stop;", "end;", "break;", "exit;"],
      correct: "break;",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 24,
      text: "What is the output of:<code-block>int i = 0;  while(i<3){  \n    System.out.print(i);  \n    i++;  \n}  </code-block>",
      options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2"],
      correct: "0 1 2",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 25,
      text: "In a for loop, which part controls the termination condition?",
      options: [
        "Initialization",
        "Condition",
        "Increment/Decrement",
        "Body",
      ],
      correct: "Condition",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 26,
      text: "In C, the keyword used to return a value from a function is:",
      options: ["break", "end", "return", "stop"],
      correct: "return",
      btl_level: 1,
      topicId: 'p5', // Functions
    },
    {
      id: 27,
      text: "What is the correct way to define a function in C++?",
      options: [
        "int sum(a, b){ return a+b; }",
        "int sum(int a, int b){ return a+b; }",
        "function sum(int a, int b) { return a+b; }",
        "sum(int a, int b): return a+b;",
      ],
      correct: "int sum(int a, int b){ return a+b; }",
      btl_level: 1,
      topicId: 'p5', // Functions
    },
    {
      id: 28,
      text: "Functions can return:",
      options: [
        "Only integers",
        "Only strings",
        "Any data type",
        "Only void",
      ],
      correct: "Any data type",
      btl_level: 1,
      topicId: 'p5', // Functions
    },
    {
      id: 29,
      text: "Which keyword is used to return a value from a function?",
      options: ["exit", "return", "break", "yield"],
      correct: "return",
      btl_level: 1,
      topicId: 'p5', // Functions
    },
    {
      id: 30,
      text: "Which loop can be used in nested structures?",
      options: [
        "Only for loops",
        "Only while loops",
        "Only do-while loops",
        "Any loop",
      ],
      correct: "Any loop",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 31,
      text: "In C, which statement is used to skip the current iteration of a loop?",
      options: ["break;", "continue;", "return;", "skip;"],
      correct: "continue;",
      btl_level: 1,
      topicId: 'p4', // Loops
    },
    {
      id: 32,
      text: "If an array arr[10] is declared, what is the valid index range?",
      options: ["1 to 10", "0 to 9", "-1 to 9", "0 to 10"],
      correct: "0 to 9",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    // New Code Questions (BTL 1)
    {
      id: 51,
      text: "What is the output of the following code in C++?<code-block>int arr[3] = {1, 2, 3};  \ncout << arr[1];</code-block>",
      options: ["1", "2", "3", "Error"],
      correct: "2",
      btl_level: 1,
      topicId: 'p3', // Arrays
    },
    {
      id: 52,
      text: 'What is the output of:<code-block>void printHello(){  \n    cout << "Hello";  \n}  \nint main(){  \n    printHello();  \n}</code-block>',
      options: ["main", "Hello", "printHello", "Error"],
      correct: "Hello",
      btl_level: 1,
      topicId: 'p5', // Functions
    },

    // BTL Level 2: Understanding
    {
      id: 33,
      text: "Why do we use data types in programming?",
      options: [
        "To reduce memory",
        "To define the kind of data a variable can store",
        "To increase speed",
        "To avoid loops",
      ],
      correct: "To define the kind of data a variable can store",
      btl_level: 2,
      topicId: 'p2', // Data Types
    },
    {
      id: 34,
      text: "What happens if you try to store a float value in an int variable?",
      options: [
        "Error at compile time",
        "Value is rounded automatically",
        "Fractional part is truncated",
        "Program crashes",
      ],
      correct: "Fractional part is truncated",
      btl_level: 2,
      topicId: 'p2', // Data Types
    },
    {
      id: 35,
      text: 'What is the output of System.out.println(5 + "5"); in Java?',
      options: ["10", '"55"', "5", "Error"],
      correct: '"55"',
      btl_level: 2,
      topicId: 'p2', // Data Types (String concatenation which is a type behavior)
    },
    {
      id: 36,
      text: "Which of these is not a primitive data type in Java?",
      options: ["int", "char", "String", "float"],
      correct: "String",
      btl_level: 2,
      topicId: 'p2', // Data Types
    },
    {
      id: 37,
      text: "Which statement best describes an array?",
      options: [
        "A group of unrelated variables",
        "A collection of variables of different data types",
        "A collection of variables of the same data type stored at contiguous memory locations",
        "A loop variable",
      ],
      correct:
        "A collection of variables of the same data type stored at contiguous memory locations",
      btl_level: 2,
      topicId: 'p3', // Arrays
    },
    {
      id: 38,
      text: "What happens if you access an array index out of bounds in Java?",
      options: [
        "Returns 0",
        "Compilation error",
        "Runtime error",
        "Ignored",
      ],
      correct: "Runtime error",
      btl_level: 2,
      topicId: 'p3', // Arrays
    },
    {
      id: 39,
      text: "How is a for loop different from a while loop?",
      options: [
        "A for loop is faster",
        "A for loop is always infinite",
        "A for loop is useful when the number of iterations is known",
        "They are the same",
      ],
      correct:
        "A for loop is useful when the number of iterations is known",
      btl_level: 2,
      topicId: 'p4', // Loops
    },
    {
      id: 40,
      text: "Which loop is most suitable when the number of iterations is unknown?",
      options: ["for loop", "while loop", "do-while loop", "switch loop"],
      correct: "while loop",
      btl_level: 2,
      topicId: 'p4', // Loops
    },
    {
      id: 41,
      text: "Infinite loops can be created using:",
      options: ["for(;;)", "while(true)", "Both A & B", "None"],
      correct: "Both A & B",
      btl_level: 2,
      topicId: 'p4', // Loops
    },
    {
      id: 42,
      text: "Why do we use functions in programming?",
      options: [
        "To slow down execution",
        "To repeat the same code multiple times without rewriting",
        "To reduce memory",
        "To make loops unnecessary",
      ],
      correct: "To repeat the same code multiple times without rewriting",
      btl_level: 2,
      topicId: 'p5', // Functions
    },
    {
      id: 43,
      text: "Which of the following is pass by value in C++?",
      options: [
        "void func(int x)",
        "void func(int &x)",
        "void func(int* x)",
        "void func(&x)",
      ],
      correct: "void func(int x)",
      btl_level: 2,
      topicId: 'p5', // Functions
    },
    {
      id: 44,
      text: "What is the output of int x = 5; int y = x++; cout << y;?",
      options: ["4", "5", "6", "Error"],
      correct: "5",
      btl_level: 2,
      topicId: 'p1', // Basic Programming (Operators)
    },
    {
      id: 45,
      text: "If a for loop is written as for(;;), what happens?",
      options: [
        "Runs once",
        "Infinite loop",
        "Compile error",
        "Skips iteration",
      ],
      correct: "Infinite loop",
      btl_level: 2,
      topicId: 'p4', // Loops
    },
    // New Code Question (BTL 2)
    {
      id: 53,
      text: 'What will be the output of this code?<code-block>int a = 5, b = 2;printf("%d", a/b);</code-block>',
      options: ["2.5", "2", "2.0", "3"],
      correct: "2",
      btl_level: 2,
      topicId: 'p1', // Basic Programming (Integer division)
    },

    // BTL Level 3: Applying
    {
      id: 46,
      text: "Which of the following code snippets correctly declares and initializes an array of 5 integers?",
      options: [
        "int arr[5] = {1,2,3,4,5};",
        "int arr = {1,2,3,4,5};",
        "int arr[5] = 1,2,3,4,5;",
        "int arr(5) = {1,2,3,4,5};",
      ],
      correct: "int arr[5] = {1,2,3,4,5};",
      btl_level: 3,
      topicId: 'p3', // Arrays
    },
    {
      id: 47,
      text: "Given: int a=5, b=3; if(a>b && b!=0) { a++; } else { b--; } What is the final value of 'a'?",
      options: ["5", "6", "4", "Error"],
      correct: "6",
      btl_level: 3,
      topicId: 'p1', // Basic Programming (Logic)
    },
    {
      id: 48,
      text: 'Predict the output: for(int i=0; i<3; i++) { if(i==1) continue; printf("%d", i); }',
      options: ["012", "02", "12", "01"],
      correct: "02",
      btl_level: 3,
      topicId: 'p4', // Loops
    },
    {
      id: 49,
      text: "What is the value of 'x' after the loop: int x=1; while(x<5) { x *= 2; }",
      options: ["4", "5", "8", "16"],
      correct: "8",
      btl_level: 3,
      topicId: 'p4', // Loops
    },
    {
      id: 50,
      text: "A function is defined as: int calc(int n) { return n * 2; }. What is the output of calc(calc(3))?",
      options: ["6", "12", "3", "18"],
      correct: "12",
      btl_level: 3,
      topicId: 'p5', // Functions (Recursion-ish/Composition)
    },
    // New Code Questions (BTL 3)
    {
      id: 54,
      text: 'What will be the output of this code?<code-block>int x = 10;\nx = x + 5;printf("%d", x);</code-block>',
      options: ["10", "15", "5", "20"],
      correct: "15",
      btl_level: 3,
      topicId: 'p1', // Basic Programming (Assignment)
    },
    {
      id: 55,
      text: 'Predict the output:<code-block>for(int i=1; i<=3; i++) {\n    printf("%d ", i*i);\n}</code-block>',
      options: ["1 2 3", "1 4 9", "2 4 6", "1 8 27"],
      correct: "1 4 9",
      btl_level: 3,
      topicId: 'p4', // Loops
    },
    {
      id: 56,
      text: "What will the following Java code print?<code-block>int sum = 0;for(int i=1; i<=5; i++) {\n    sum += i;\n}\nSystem.out.println(sum);</code-block>",
      options: ["5", "10", "15", "20"],
      correct: "15",
      btl_level: 3,
      topicId: 'p4', // Loops
    },
  // C Coding Questions (BTL 3)
  {
    id: 1001,
    type: "code",
    language: "c",
    text: "Write a C program to calculate the sum of two integers. The input provides two integers separated by a space. Output their sum.",
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int a, b;\n    // Read input\n    scanf("%d %d", &a, &b);\n    \n    // Complete the logic\n    \n    return 0;\n}',
    testCases: [
      { input: "10 20", expected: "30" },
      { input: "-5 15", expected: "10" },
      { input: "100 200", expected: "300" },
    ],
    btl_level: 3,
    topicId: 'p5', // Functions / Basic Prog
  },
  {
    id: 1002,
    type: "code",
    language: "c",
    text: "Write a C program to find the factorial of a given number N. Input is a single integer N.",
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    \n    // Write your factorial logic here\n    \n    return 0;\n}',
    testCases: [
      { input: "5", expected: "120" },
      { input: "0", expected: "1" },
      { input: "4", expected: "24" },
    ],
    btl_level: 3,
    topicId: 'p4', // Loops/Recursion (Factorial usually implies loop/recursion)
  },
  {
    id: 1003,
    type: "code",
    language: "c",
    text: "Write a C program to print the sum of an array of N integers. First input is N, followed by N integers.",
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int n, i, sum = 0;\n    scanf("%d", &n);\n    int arr[n];\n    \n    // Read array and calculate sum\n    \n    printf("%d", sum);\n    return 0;\n}',
    testCases: [
      { input: "3 1 2 3", expected: "6" },
      { input: "5 10 20 30 40 50", expected: "150" },
      { input: "2 -5 5", expected: "0" },
    ],
    btl_level: 3,
    topicId: 'p3', // Arrays
  },
];
