
import os
import shutil

import git

def download_repository(repository):

    name = get_name(repository)
    path = "tmp/{}".format(name)

    if os.path.exists(path):
        shutil.rmtree(path)

    git.Git().clone(repository, path)

    return path

def get_name(rep):
    splt = rep.split("/")

    return splt[-1]
