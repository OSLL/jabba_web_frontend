
import os
import shutil

import git

def download_repository(repository, update_repository):

    name = get_name(repository)
    path = "tmp/{}".format(name)

    if os.path.exists(path):
        if update_repository == 'true':
            shutil.rmtree(path)
        else:
            return path

    git.Git().clone(repository, path)

    return path

def get_name(rep):
    splt = rep.split("/")

    return splt[-1]
