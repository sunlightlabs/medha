/* global define */

define([
    'jquery',
    'underscore',
    'marionette',
    '../base',
    '../core',
    '../context/filters'
], function($, _, Marionette, base, c, filters) {

    var LoadingQueryItem = base.LoadView.extend({
        align: 'left'
    });

    var QueryItem = Marionette.ItemView.extend({
        className: 'query-item',

        template: 'query/item',

        options: {
            editable: false
        },

        ui: {
            owner: '.owner',
            nonOwner: '.non-owner',
            shareCount: '.share-count',
            publicIcon: '.public-icon',
            details: '[data-target=details]',
            toggleDetails: '[data-target=toggle-details]',
            actions: '.owner button'
        },

        events: {
            'click [data-toggle=delete-query-modal]': 'showDeleteQueryModal',
            'click [data-toggle=edit-query-modal]': 'showEditQueryModal',
            'click [data-target=query]': 'loadQuery',
            'click @ui.toggleDetails': 'toggleDetails',
            'mouseover': 'showActions',
            'mouseout': 'hideActions'
        },

        modelEvents: {
            sync: 'render'
        },

        initialize: function() {
            this.data = {};

            if (!(this.data.context = this.options.context)) {
                throw new Error('context model required');
            }

            if (!(this.data.view = this.options.view)) {
                throw new Error('view model required');
            }
        },

        // Custom serialize method to ensure the two nested objects exist for
        // use by the template.
        serializeData: function() {
            var data = this.model.toJSON();
            if (!data.shared_users) data.shared_users = []; // jshint ignore:line
            if (!data.user) data.user = {};
            return data;
        },

        showActions: function() {
            this.ui.actions.show();
        },

        hideActions: function() {
            this.ui.actions.hide();
        },

        // Set the query's context and view json on the session context
        // and view, navigate to the results to view results
        loadQuery: function(event) {
            event.preventDefault();
            event.stopPropagation();

            $.when(
                this.data.view.save('json', this.model.get('view_json')),
                this.data.context.save('json', this.model.get('context_json'), {
                    reset: true
                })
            ).done(function() {
                c.router.navigate('results', {trigger: true});
            }).fail(function() {
                c.notify({
                    timeout: null,
                    dismissable: true,
                    level: 'error',
                    header: 'Error Opening Query',
                    message: 'An error occurred when opening the query. ' +
                             'Click on the link again to try to open the ' +
                             'query again.'
                });
            });
        },

        showEditQueryModal: function() {
            this.trigger('showEditQueryModal', this.model);
        },

        showDeleteQueryModal: function() {
            this.trigger('showDeleteQueryModal', this.model);
        },

        toggleDetails: function(event) {
            event.preventDefault();

            if (this.ui.details.is(':visible')) {
                this.ui.toggleDetails.text('Show details');
                this.ui.details.hide();
            }
            else {
                this.ui.toggleDetails.text('Hide details');
                this.ui.details.show();
            }
        },

        renderDetails: function() {
            var html = [];

            if (this.model.get('description')) {
                html.push('<span class=muted>' + this.model.get('description') +
                          '</span>');
            }

            html.push('<div class=row-fluid><div class=span6><h6>Filters</h6>');

            var json = this.model.context.get('json');

            if (!json || _.isEmpty(json)) {
                html.push('<p class=muted>No filters were specified for this query.</p>');
            }
            else {
                filters.flattenLanguage(json, html);
            }

            html.push('</div><div class=span6>');

            /*
             * When the session.defaults.data.preview setting is being used,
             * the view is overridden when making request to the preview endpoint
             * so displaying the columns will not be useful. If this setting
             * does not exist, then display the columns under a saved query.
             */
            if (!c.config.get('session.defaults.data.preview')) {
                html.push('<h6>Columns</h6>');

                if (!this.model.view.facets.length) {
                    html.push('<p class=muted>No columns were selected this query.</p>');
                }
                else {
                    html.push('<ul>');

                    // Retrieve the columns selected
                    this.model.view.facets.each(function(model) {
                        var concept = c.data.concepts.get(model.get('concept'));

                        if (concept === undefined) return;

                        var name = concept.get('name'),
                            sort = model.get('sort');

                        html.push('<li>' + name);

                        if (sort === 'asc') {
                            html.push(' <i class=icon-caret-up ' +
                                      'title="Ascending Order"></i>');
                        }
                        else if (sort === 'desc') {
                            html.push(' <i class=icon-caret-down ' +
                                      'title="Descending Order"></i>');
                        }

                        html.push('</li>');
                    });

                    html.push('</ul>');
                }
            }

            html.push('</div></div>');

            this.ui.details.html(html.join(''));
        },

        onRender: function() {
            // The details requires the concepts to be loaded. This checks
            // based on existence, otherwise waits until they sync.
            if (c.data.concepts.length) {
                this.renderDetails();
            }
            else {
                this.listenTo(c.data.concepts, 'sync', function() {
                    this.renderDetails();
                });
            }

            // Short-circuit render if not editable
            if (!this.options.editable) {
                this.ui.publicIcon.hide();
                this.ui.owner.hide();

                // If we are not the owner and the owner is unknown, hide the
                // shared by information as it will only lead to confusion.
                if (!this.model.get('user')) {
                    this.ui.nonOwner.hide();
                }

                return;
            }

            if (this.model.get('public')) {
                this.ui.publicIcon
                    .removeClass('muted')
                    .attr('title', 'Public query');
            }

            // NOTE: The container needs to be set to overcome an issue
            // with tooltip placement in bootstrap < 3.0. This container
            // setting can be removed after we upgrade to bootstrap >= 3.0.
            this.ui.publicIcon.tooltip({
                html: true,
                animation: false,
                placement: 'left',
                container: 'body'
            });

            if (this.model.get('is_owner')) {
                this.ui.nonOwner.hide();

                var emails = _.pluck(this.model.get('shared_users'), 'email');

                if (emails.length) {
                    this.ui.shareCount
                        .removeClass('muted')
                        .attr('title', emails.join(', '));
                }

                this.ui.shareCount.tooltip({
                    html: true,
                    animation: false,
                    placement: 'left',
                    container: 'body'
                });
            }
            else {
                this.ui.owner.hide();
            }
        }
    });

    return {
        LoadingQueryItem: LoadingQueryItem,
        QueryItem: QueryItem
    };

});
