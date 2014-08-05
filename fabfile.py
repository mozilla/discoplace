import os

import fabdeploytools.envs
from fabric.api import env, lcd, local, task
from fabdeploytools import helpers

import deploysettings as settings

env.key_filename = settings.SSH_KEY
fabdeploytools.envs.loadenv(settings.CLUSTER)
ROOT, DISCOPLACE = helpers.get_app_dirs(__file__)

COMMONPLACE = '%s/node_modules/commonplace/bin' % DISCOPLACE

os.environ["PATH"] += os.pathsep + os.pathsep.join([COMMONPLACE])


@task
def pre_update(ref):
    with lcd(DISCOPLACE):
        local('git fetch')
        local('git fetch -t')
        local('git reset --hard %s' % ref)


@task
def update():
    with lcd(DISCOPLACE):
        local('npm install')
        local('npm install --force commonplace@0.4.22')
        local('commonplace includes')
        local('commonplace langpacks')


@task
def deploy():
    helpers.deploy(name=settings.PROJECT_NAME,
                   app_dir='discoplace',
                   env=settings.ENV,
                   cluster=settings.CLUSTER,
                   domain=settings.DOMAIN,
                   root=ROOT)
