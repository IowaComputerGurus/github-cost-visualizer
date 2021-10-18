/**
 * Get color array.
 * @param {number} colorCount - Number of resulting colors.
 * @param {string} color1 - First color option
 * @param {string} color2 - Second color option
 * @param {string} color3 - Third color option
 * @param {string} color4 - Fourth color option
 */
function getColors(colorCount, color1, color2, color3, color4) {
    var style = getComputedStyle(document.body);
    var theme = {};
    theme.primary = style.getPropertyValue('--primary');
    theme.secondary = style.getPropertyValue('--secondary');
    theme.dark = style.getPropertyValue('--dark');
    theme.light = style.getPropertyValue('--light');
    
    var colorArray = [];

    if (color1 != null && color1 != '') {
        switch (color1) {
            case 'primary':
                colorArray.push(theme.primary);
                break;
            case 'secondary':
                colorArray.push(theme.secondary);
                break;
            case 'dark':
                colorArray.push(theme.dark);
                break;
            case 'light':
                colorArray.push(theme.light);
                break;
            default:
                colorArray.push(theme.primary);
                break;
        }
    }

    if (color2 != null && color2 != '') {
        switch (color2) {
            case 'primary':
                colorArray.push(theme.primary);
                break;
            case 'secondary':
                colorArray.push(theme.secondary);
                break;
            case 'dark':
                colorArray.push(theme.dark);
                break;
            case 'light':
                colorArray.push(theme.light);
                break;
            default:
                colorArray.push(theme.dark);
                break;
        }
    }

    if (color3 != null && color3 != '') {
        switch (color3) {
            case 'primary':
                colorArray.push(theme.primary);
                break;
            case 'secondary':
                colorArray.push(theme.secondary);
                break;
            case 'dark':
                colorArray.push(theme.dark);
                break;
            case 'light':
                colorArray.push(theme.light);
                break;
            default:
                colorArray.push(theme.primary);
                break;
        }
    }

    if (color4 != null && color4 != '') {
        switch (color4) {
            case 'primary':
                colorArray.push(theme.primary);
                break;
            case 'secondary':
                colorArray.push(theme.secondary);
                break;
            case 'dark':
                colorArray.push(theme.dark);
                break;
            case 'light':
                colorArray.push(theme.light);
                break;
            default:
                colorArray.push(theme.primary);
                break;
        }
    }

    // Ensure the length of the colorArray is not greater than colorCount
    while (colorArray.length > colorCount) {
        colorArray.pop();
    }

    if (colorCount == 1) {
        return colorArray[0];
    } else {
        return gradstop({
            stops: colorCount,
            inputFormat: 'hex',
            colorArray: colorArray
        });
    }
}
