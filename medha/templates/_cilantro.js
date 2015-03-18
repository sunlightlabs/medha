{% load static %}
var require = {
    baseUrl: "{% static 'cilantro/dist/js' %}"
},

cilantro = {
    url: '{% url "serrano:root" %}',
    main: '#content',
    root: '{{ request.META.SCRIPT_NAME }}'
};
