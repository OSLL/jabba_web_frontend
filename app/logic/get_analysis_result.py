
import os
import jabba
from jabba import Analyzer
from subprocess import check_output, CalledProcessError

from .git import download_repository

def get_analysis_result(repository, yaml_root, synonyms, **kwargs):
    cwd = os.getcwd()

    path = download_repository(repository)
    os.chdir(path)

    analysis_args = []

    for arg, params in kwargs.items():
        if params == '':
            continue

        s = arg + ':' + ":".join(params.split(' '))

        analysis_args.append(s)

    call_args = ['jabba', 
        '--yaml-root={}'.format(yaml_root), 
        '--synonyms={}'.format(synonyms) if synonyms else '',
        '--verbose=0', 
        '--analysis', 
        ]

    call_args.extend(analysis_args)

    # call doesn't accept '' as argument
    call_args = [arg for arg in call_args if arg != '']

    try:
        result = check_output(call_args)
    except CalledProcessError as grepexc:
        print(repr(grepexc))
        result = grepexc.output

    result = result.decode()

    result = result.split('\n')

    os.chdir(cwd)

    results = []
    current_result = {'header': '', 'body': ''}
    prev_line = ''

    for line in result:
        print(current_result)
        # If line after header
        if line.startswith('---'):
            if current_result['header'] == '':
                current_result['header'] = prev_line
                continue

            results.append(current_result)

            current_result = {
                    'header': prev_line,
                    'body': ''
            }
        elif current_result['header'] != '':
                current_result['body'] += line + '\n'

        prev_line = line

    results.append(current_result)

    return results
