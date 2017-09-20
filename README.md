Eionet Nginx docker
===================

Nginx based docker image used for serving the EIONET styles [EIONET styles](http://eionet.europa.eu)

[![Docker]( https://dockerbuildbadges.quelltext.eu/status.svg?organization=eeacms&repository=nginx-eionet-styles)](https://hub.docker.com/r/eeacms/nginx-eionet-styles/builds)

### Prerequisites

* Install [Docker](https://docs.docker.com/engine/installation/)
* Install [Docker Compose](https://docs.docker.com/compose/install/)

1. Get the source code:

        $ git clone https://github.com/eea/eea.docker.nginx-eionet-styles
        $ cd eea.docker.nginx-eionet-styles

2. Build and run the image locally:

        $ docker build -t nginx:local .
        $ docker run --it nginx:local sh