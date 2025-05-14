> **Important Note:** This simulation is designed for desktop view only. For the best experience, please use a desktop monitor with a minimum resolution of 1280x720 pixels. The simulation may not function properly on smaller screens like mobile devices or tablets.

### 1. Understanding the Simulation

This simulation helps you learn about two types of adders in Verilog:

- **Half Adder:** A combinational circuit that adds two single-bit binary numbers and produces a sum and carry output.
- **Full Adder:** A combinational circuit that adds three single-bit binary numbers and produces a sum and carry output.

### 2. Getting Started

1. Select the type of adder you want to work with using the tabs at the top of the simulation.
2. Enter your module name and testbench name in the respective fields:
   - Module names must follow [Verilog naming conventions](https://www.chipverify.com/verilog/verilog-syntax).
   - Only letters, numbers, and underscores are allowed (no hyphens or special characters).
   - Testbench name must end with '_tb'.

### 3. Building the Verilog Module

1. In the first column, arrange the code blocks in the correct order by dragging and dropping them:
   - The code block that defines inputs, outputs, and module name should be placed first
   - Followed by the code block that defines the module functionality
   - Finally, the end of module block

2. For Half Adder:
   - Select appropriate inputs (A, B) and outputs (Sum, Carry)
   - Define the functionality using assign statements:
     - Sum = A XOR B
     - Carry = A AND B

3. For Full Adder:
   - Select appropriate inputs (A, B, Cin) and outputs (Sum, Carry)
   - Define the functionality using two half adders and additional logic:
     - First half adder: A + B
     - Second half adder: (A + B) + Cin
     - Final carry: (A AND B) OR (Cin AND (A XOR B))

### 4. Creating the Testbench

1. In the second column, arrange the testbench code blocks in the correct order:
   - Testbench name definition
   - Signal declarations (reg for inputs, wire for outputs)
   - Module instantiation
   - Input wave definitions
   - End of module

2. Define the testbench signals:
   - For Half Adder: `reg A, B; wire Sum, Carry`
   - For Full Adder: `reg A, B, Cin; wire Sum, Carry`

3. Connect the ports correctly in the module instantiation, maintaining the same order as defined in the module.

### 5. Validation and Observation

1. Click the "Validate" button to check your code.
2. The observation column will show:
   - Error messages in red if there are mistakes. Refer to the [Troubleshooting](#6-troubleshooting) section below for dealing with the Error messages.
   - A truth table showing the expected behavior if the code is correct.
3. If you need to start over, click the "Reset" button to shuffle the code blocks.

#### Verilog Syntax Reference

- For detailed Verilog syntax rules, refer to the [Verilog Syntax Guide](https://www.chipverify.com/verilog/verilog-syntax).
- For module and testbench examples, visit [ASIC World Verilog Tutorial](https://www.asic-world.com/verilog/veritut.html).

### 6. Troubleshooting

If you see error messages, carefully check:

- Module and testbench names follow the naming rules.
- Code blocks are in the correct order.
- All signal selections match the expected values.
- Port connections are properly defined.
- For Full Adder, ensure the half adder connections are correct.

Additional tips:

- Use the Reset button to start fresh if needed.
- Switch between adder types to compare their differences.

#### Important Reminders

- Verilog is case-sensitive.
- All signals must be properly declared before use.
- Testbench signals must match the module ports.
- Code blocks must be in the correct order for the simulation to work.
- Use blocking assignment (=) for combinational logic.
- For Full Adder, ensure proper connection of intermediate signals.