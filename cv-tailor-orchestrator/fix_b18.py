
import os

filepath = '/home/k/Desktop/cvmaker/cv-tailor-orchestrator/blocks/B18.yaml'

with open(filepath, 'r') as f:
    lines = f.readlines()

new_lines = []
in_instructions = False

for line in lines:
    if line.startswith('instructions: |'):
        in_instructions = True
        new_lines.append(line)
        continue
    
    if in_instructions:
        if line.startswith('max_retries:') or line.startswith('checkpoint_tests:'):
            in_instructions = False
            new_lines.append(line)
        else:
            # If line is NOT indented, indent it
            if line.strip() and not line.startswith('  '):
                new_lines.append('  ' + line)
            else:
                new_lines.append(line)
    else:
        new_lines.append(line)

with open(filepath, 'w') as f:
    f.writelines(new_lines)
