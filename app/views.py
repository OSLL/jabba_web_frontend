from flask import render_template, flash, redirect, session, url_for, request, jsonify
from app import app, logic

@app.route('/')
@app.route('/analysis')
def analysis():
    return render_template('analysis.html', active="analysis")

@app.route('/graphs')
def graphs():
    return render_template('graphs.html', active='graphs')



@app.route('/api/graphs')
def api_graphs():
    repository = request.args.get('repository', '', type=str)
    yaml_root = request.args.get('yaml_root', '', type=str)
    graph_type = request.args.get('graph', '', type=str)
    files = request.args.get('files', '', type=str)
    rank_dir = request.args.get('rank_dir', 'left-right', type=str)
    legend = request.args.get('legend', '', type=str)
    call_parameters = request.args.get('call_parameters', '', type=str)
    call_display = request.args.get('call_display', 'none', type=str)
    update_repository = request.args.get('update_repository', 'false', type=str)
    checkout_target = request.args.get('checkout_target', 'master', type=str)

    graph = logic.build_graph(
            repository=repository, 
            yaml_root=yaml_root, 
            graph_type = graph_type, 
            files=files, 
            rank_dir=rank_dir, 
            legend=legend,
            call_parameters=call_parameters,
            call_display=call_display,
            update_repository=update_repository,
            checkout_target=checkout_target
            )

    return jsonify(graph=graph)

@app.route('/api/analysis')
def api_analysis():
    repository = request.args.get('repository', '', type=str)
    yaml_root = request.args.get('yaml_root', '', type=str)
    synonyms = request.args.get('synonyms', '', type=str)
    depends_on = request.args.get('depends_on', '', type=str)
    unused_configs = request.args.get('unused_configs', '', type=str)
    update_repository = request.args.get('update_repository', 'false', type=str)
    parameters_present = request.args.get('parameters_present', '', type=str)
    cyclic_deps = request.args.get('cyclic_deps', '', type=str)
    checkout_target = request.args.get('checkout_target', 'master', type=str)

    analysis_result = logic.get_analysis_result(repository=repository, yaml_root=yaml_root, synonyms=synonyms, 
            depends_on=depends_on, unused_configs=unused_configs, update_repository=update_repository, 
            parameters_present=parameters_present, cyclic_deps=cyclic_deps, checkout_target=checkout_target)

    return jsonify(result=analysis_result)
