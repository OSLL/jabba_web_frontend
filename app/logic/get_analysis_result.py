
import os
import jabba
from jabba import Analyzer
from subprocess import check_output, CalledProcessError

from .git import download_repository

def get_analysis_result(repository, yaml_root, synonyms, update_repository='false', **kwargs):
    cwd = os.getcwd()

    path = download_repository(repository, update_repository)
    os.chdir(path)

    analysis_args = []

    for arg, params in kwargs.items():
        if params == '':
            continue

        s = arg + ':' + ":".join(params.split(' '))

        analysis_args.append(s)

    results = []

    analyzer = Analyzer(root=yaml_root, arguments=analysis_args, synonyms=synonyms, verbose=2)

    analyzer.run()

    for result in analyzer.results:

        # result.results may contain usefull info even if result.is_ok() is True
        if result.is_ok() and len(result.results) == 0:
            body = 'OK'
        else:
            body = '\n'.join(map(str, result.results))

        results.append({
            'header': result.header,
            'body': body
        })

    os.chdir(cwd)

    return results
