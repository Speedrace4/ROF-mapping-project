var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
        var lyr_OpenStreetMap_0_2 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Communities_1 = new ol.format.GeoJSON();
var color_changer = 0;
var features_Communities_1 = format_Communities_1.readFeatures(json_Communities_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Communities_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Communities_1.addFeatures(features_Communities_1);
var lyr_Communities_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Communities_1, 
                style: style_Communities_1,
                popuplayertitle: "Communities",
                interactive: true,
                title: '<img src="styles/legend/Communities_1.png" /> Communities'
            });
var format_Police_2 = new ol.format.GeoJSON();
// var features_Police_2 = format_Police_2.readFeatures(json_Police_2, 
//             {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Police_2 = new ol.source.Vector({
    attributions: ' ',
});
// jsonSource_Police_2.addFeatures(features_Police_2);
// var lyr_Police_2 = new ol.layer.Vector({
//                 declutter: false,
//                 source:jsonSource_Police_2, 
//                 style: style_Police_2,
//                 popuplayertitle: "Police",
//                 interactive: true,
//                 title: '<img src="styles/legend/Police_2.png" /> Police'
//             });

lyr_OpenStreetMap_0.setVisible(true);lyr_OpenStreetMap_0_2.setVisible(true);lyr_Communities_1.setVisible(true);
// lyr_Police_2.setVisible(false);
var layersList = [lyr_OpenStreetMap_0,lyr_Communities_1/*,lyr_Police_2*/];
var layersList2 = [lyr_OpenStreetMap_0_2];
lyr_Communities_1.set('fieldAliases', {'community': 'community', 'area': 'area', 'shape_area': 'shape_area', 'perimeter': 'perimeter', 'area_num_1': 'area_num_1', 'area_numbe': 'area_numbe', 'comarea_id': 'comarea_id', 'comarea': 'comarea', 'shape_len': 'shape_len', });
// lyr_Police_2.set('fieldAliases', {'dist_label': 'dist_label', 'dist_num': 'dist_num', });
lyr_Communities_1.set('fieldImages', {'community': 'TextEdit', 'area': 'TextEdit', 'shape_area': 'TextEdit', 'perimeter': 'TextEdit', 'area_num_1': 'TextEdit', 'area_numbe': 'TextEdit', 'comarea_id': 'TextEdit', 'comarea': 'TextEdit', 'shape_len': 'TextEdit', });
// lyr_Police_2.set('fieldImages', {'dist_label': 'TextEdit', 'dist_num': 'TextEdit', });
lyr_Communities_1.set('fieldLabels', {'community': 'no label', 'area': 'no label', 'shape_area': 'no label', 'perimeter': 'no label', 'area_num_1': 'no label', 'area_numbe': 'no label', 'comarea_id': 'no label', 'comarea': 'no label', 'shape_len': 'no label', });
// lyr_Police_2.set('fieldLabels', {'dist_label': 'no label', 'dist_num': 'no label', });
// lyr_Police_2.on('precompose', function(evt) {
//     evt.context.globalCompositeOperation = 'normal';
// });