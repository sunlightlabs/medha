import re
from django.conf.urls import url, patterns, include
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView
from django.template import add_to_builtins

add_to_builtins('avocado.templatetags.avocado_tags')

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing'),
    url(r'^workspace/', TemplateView.as_view(template_name='index.html'), name='workspace'),
    url(r'^query/', TemplateView.as_view(template_name='index.html'), name='query'),
    url(r'^results/', TemplateView.as_view(template_name='index.html'), name='results'),

    # Serrano-compatible Endpoint
    url(r'^api/', include('serrano.urls')),
)
