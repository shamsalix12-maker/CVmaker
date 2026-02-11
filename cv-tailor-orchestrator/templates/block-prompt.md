# BLOCK {{block_id}}: {{block_name}}

## COMPLETED BLOCKS
{{completed_blocks_list}}

## GOAL
{{block_goal}}

## FILES TO CREATE
{{files_to_create_list}}

## FILES TO MODIFY
{{files_to_modify_list}}

## EXISTING FILES YOU MAY IMPORT FROM
{{available_files_list}}

## FILES YOU MUST NOT TOUCH
Everything not listed above.

{{#if commands}}
## COMMANDS TO RUN
{{commands_list}}
{{/if}}

{{#if content}}
## EXACT FILE CONTENTS
{{file_contents}}
{{/if}}

## INSTRUCTIONS
{{instructions}}

## CHECKPOINT TESTS (verify ALL after completion)
{{checkpoint_tests_list}}

## MANDATORY RULES
1. Create ONLY the files listed in "FILES TO CREATE"
2. Modify ONLY the files listed in "FILES TO MODIFY"
3. NEVER import from files not in "EXISTING FILES"
4. NEVER reference files that don't exist
5. After completion, list every file you created/modified with full path
6. Mark each checkpoint test as ✅ PASS or ❌ FAIL
7. If unsure about anything, ASK — don't guess
8. Keep each file under 200 lines
9. All user-facing text must use i18n (if i18n is set up)
10. Handle errors gracefully
