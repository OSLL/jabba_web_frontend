
import os
import jabba
from subprocess import call

from .git import download_repository

def build_graph(repository, yaml_root, graph_type, files):
    cwd = os.getcwd()

    path = download_repository(repository)
    os.chdir(path)

    graph = '--include-graph' if graph_type == 'include' else '--call-graph'

    call(['jabba', '--yaml-root={}'.format(yaml_root), graph, '--name=graph', '--verbose=2', '--files={}'.format(files)])

    os.chdir(cwd)

    output = "{}/graph_include.svg".format(path)

    if graph_type == 'call':
        output = "{}/graph_call.svg".format(path)

    with open(output, 'r') as f:
        return f.read()
