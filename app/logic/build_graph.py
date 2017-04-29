
import os
import jabba
from subprocess import call

from .git import download_repository

def build_graph(repository, yaml_root, graph_type, files, rank_dir, legend=False, call_parameters='', call_display='none'):
    cwd = os.getcwd()

    path = download_repository(repository)
    os.chdir(path)

    graph = '--include-graph' if graph_type == 'include' else '--call-graph'

    call_args = ['jabba', 
        '--yaml-root={}'.format(yaml_root), 
        graph, 
        '--name=graph', 
        '--verbose=2', 
        '--files={}'.format(files),
        '--legend' if legend =='true' else '',
        '--rank-dir={}'.format(rank_dir),
        '--call-display={}'.format(call_display),
        '--call-parameters={}'.format(call_parameters) if call_parameters != '' else ''
        ]

    # call doesn't accept '' as argument
    call_args = [arg for arg in call_args if arg != '']

    call(call_args)

    os.chdir(cwd)

    output = "{}/graph_include.svg".format(path)

    if graph_type == 'call':
        output = "{}/graph_call.svg".format(path)

    with open(output, 'r') as f:
        return f.read()
