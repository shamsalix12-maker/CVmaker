import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export interface TestResult {
    test_id: string;
    description: string;
    passed: boolean;
    actual_output?: string;
    expected_output?: string;
    error?: string;
}

export interface CheckpointTest {
    id: string;
    description: string;
    type: 'command' | 'files_exist' | 'grep' | 'contains' | 'custom';
    command?: string;
    expected?: string;
    expected_exit_code?: number;
    files?: string[];
    file?: string;
    patterns?: string[];
    custom_fn?: string;
}

const PROJECT_ROOT = path.resolve(__dirname, '../../cv-tailor-app');

export function runTest(test: CheckpointTest): TestResult {
    try {
        switch (test.type) {
            case 'files_exist':
                return verifyFilesExist(test);
            case 'command':
                return verifyCommand(test);
            case 'grep':
                return verifyGrep(test);
            case 'contains':
                return verifyContains(test);
            default:
                return {
                    test_id: test.id,
                    description: test.description,
                    passed: false,
                    error: `Unknown test type: ${test.type}`
                };
        }
    } catch (err: any) {
        return {
            test_id: test.id,
            description: test.description,
            passed: false,
            error: err.message
        };
    }
}

function verifyFilesExist(test: CheckpointTest): TestResult {
    const missing: string[] = [];
    for (const file of test.files || []) {
        const fullPath = path.join(PROJECT_ROOT, file);
        if (!fs.existsSync(fullPath)) {
            missing.push(file);
        }
    }
    return {
        test_id: test.id,
        description: test.description,
        passed: missing.length === 0,
        actual_output: missing.length > 0
            ? `Missing files: ${missing.join(', ')}`
            : 'All files exist',
        expected_output: 'All files exist'
    };
}

function verifyCommand(test: CheckpointTest): TestResult {
    try {
        const output = execSync(test.command!, {
            cwd: PROJECT_ROOT,
            timeout: 30000,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        if (test.expected) {
            const passed = output.trim().includes(test.expected);
            return {
                test_id: test.id,
                description: test.description,
                passed,
                actual_output: output.trim(),
                expected_output: test.expected
            };
        }
        return {
            test_id: test.id,
            description: test.description,
            passed: true,
            actual_output: 'Command executed successfully'
        };
    } catch (err: any) {
        if (test.expected_exit_code !== undefined) {
            return {
                test_id: test.id,
                description: test.description,
                passed: err.status === test.expected_exit_code,
                actual_output: `Exit code: ${err.status}`,
                expected_output: `Exit code: ${test.expected_exit_code}`,
                error: err.stderr?.toString()
            };
        }
        return {
            test_id: test.id,
            description: test.description,
            passed: false,
            error: err.message
        };
    }
}

function verifyGrep(test: CheckpointTest): TestResult {
    const filePath = path.join(PROJECT_ROOT, test.file!);
    if (!fs.existsSync(filePath)) {
        return {
            test_id: test.id,
            description: test.description,
            passed: false,
            error: `File not found: ${test.file}`
        };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const missing: string[] = [];
    for (const pattern of test.patterns || []) {
        if (!content.includes(pattern)) {
            missing.push(pattern);
        }
    }
    return {
        test_id: test.id,
        description: test.description,
        passed: missing.length === 0,
        actual_output: missing.length > 0
            ? `Missing patterns: ${missing.join(', ')}`
            : 'All patterns found',
        expected_output: 'All patterns found'
    };
}

function verifyContains(test: CheckpointTest): TestResult {
    const filePath = path.join(PROJECT_ROOT, test.file!);
    if (!fs.existsSync(filePath)) {
        return {
            test_id: test.id,
            description: test.description,
            passed: false,
            error: `File not found: ${test.file}`
        };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const passed = content.includes(test.expected!);
    return {
        test_id: test.id,
        description: test.description,
        passed,
        actual_output: passed ? 'Content found' : 'Content NOT found',
        expected_output: test.expected
    };
}

export function runAllTests(tests: CheckpointTest[]): {
    all_passed: boolean;
    results: TestResult[];
    summary: string;
} {
    const results = tests.map(t => runTest(t));
    const all_passed = results.every(r => r.passed);
    const summary = results.map(r =>
        `${r.passed ? '✅' : '❌'} [${r.test_id}] ${r.description}` +
        (r.error ? `\n   Error: ${r.error}` : '') +
        (!r.passed && r.actual_output ? `\n   Got: ${r.actual_output}` : '') +
        (!r.passed && r.expected_output ? `\n   Expected: ${r.expected_output}` : '')
    ).join('\n');
    return { all_passed, results, summary };
}
