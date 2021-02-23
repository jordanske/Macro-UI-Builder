const outputJSONFile = './src/assets/icons.json';
const rawIconsFolder = './raw_icons/';
const fs = require('fs');
const sharp = require('sharp');

let categories = {
    sub_categories: {}
};
let icons = {};

if (fs.existsSync('./src/assets/icons')) {
    fs.rmdirSync('./src/assets/icons', { recursive: true });
}
fs.mkdirSync('./src/assets/icons');

function processDirectory(path, parentCat, target_path) {
    let files = fs.readdirSync(path, { withFileTypes: true });
    files.forEach(file => {
        if (file.isDirectory()) {
            const cat_id = file.name.toLowerCase().replace(/\s/g, '_');
            let cat_name = file.name;
            if (/\d\d_/.test(cat_name)) { // Check if name starts with 2 decimal followed by underscore (00_).
                cat_name = cat_name.substr(3);
            }
            const cat_dir = target_path + '/' + cat_id;

            parentCat.sub_categories[cat_id] = {
                id: cat_id,
                name: capitalizeFirstLetter(cat_name),
                sub_categories: {},
                icons: [],
            };

            if (!fs.existsSync('./src' + cat_dir)){
                fs.mkdirSync('./src' + cat_dir);
            }

            processDirectory(
                path + file.name + '/',
                parentCat.sub_categories[cat_id],
                cat_dir
            );
        } else {
            const icon_id = file.name.toLowerCase()
                                     .replace(/\s/g, '_')
                                     .replace("'", '')
                                     .replace('"', '')
                                     .replace('.png', '');
            let icon_name = file.name.replace(/_/g, ' ').replace('.png', '');
            const icon_path = target_path + '/' + icon_id;
            const copy_from = path + file.name;
            const copy_to = './src' + icon_path;

            /* fs.copyFile(copy_from, copy_to, err => {
                if (err) throw err;
            }); */

            sharp(copy_from).extract({ width: 42, height: 42, left: 3, top: 1 })
                .toFile(copy_to);

            icons[icon_id] = {
                id: icon_id,
                name: capitalizeFirstLetter(icon_name),
                file: icon_path,
                category: ''
            };
            
            parentCat.icons.push(icon_id);
            // parentCat.icons[icon_id] = icons[icon_id];
        }
    });
}

processDirectory(rawIconsFolder, categories, '/assets/icons');

const fileContent = JSON.stringify({
    categories: categories.sub_categories,
    icons: icons,
});
fs.writeFile(outputJSONFile, fileContent, err => {
    if (err) throw err;
});



/**
 * LIB
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
