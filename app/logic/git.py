
import os
import shutil

import git

def download_repository(repository, update_repository, checkout_target='master'):

    name = get_name(repository)
    path = "tmp/{}".format(name)

    if os.path.exists(path):
        if update_repository == 'true':
            shutil.rmtree(path)
        else:

            checkout(path, checkout_target)

            return path

    git.Git().clone(repository, path)

    checkout(path, checkout_target)

    return path

def checkout(path, target):
    g = git.Git(path)

    # If target is a tag, fetch will throw exception
    try:
        g.fetch("origin", target)
    except:
        pass

    g.checkout(target)

    return g

def get_name(rep):
    splt = rep.split("/")

    return splt[-1]
