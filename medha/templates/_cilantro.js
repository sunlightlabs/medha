{% load static %}
var require = {
    baseUrl: "{% static 'cilantro/js' %}"
},

cilantro = {
    url: '{% url "serrano:root" %}',
    main: '#content',
    root: '{{ request.META.SCRIPT_NAME }}'
};
