/* 
 * Copyright (C) 2015-2018 Richard Hughes <richard@hughsie.com>
 * Licensed under the GNU General Public License Version 2
 */

function copy_xml() {
  var copyText = document.getElementById("appdata_oars");
  copyText.select();
  document.execCommand("Copy");
}

function advance_tab() {

  // make the next tab header active
  var e = document.getElementById('tab-list');
  var children = Array.from(e.children);
  var cleared = false;
  var next_section = null

  for (var i in children) {
    var tab = children[i];
    var tab_entry = tab.children[0];
    if (tab_entry.classList.contains('active')) {
      tab_entry.classList.remove('active');
      cleared = true;
    } else if (cleared) {
      // only use this if it's visible
      if (tab.style.display != 'none') {
        next_section = tab.id;
        tab_entry.classList.add('active');
        break;
      }
    }
  }

  // make the next tab body active
  e = document.getElementById('tab-content');
  children = Array.from(e.children);
  cleared = false;
  for (var i in children) {
    var tab = children[i];
    if ('tab-' + tab.id == next_section) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  }
}

function updateAppData() {
  var cats = [
    { id:       'violence-cartoon',
      versions: ['1.0', '1.1']
    },
    { id:       'violence-fantasy',
      versions: ['1.0', '1.1']
    },
    { id:       'violence-realistic',
      versions: ['1.0', '1.1']
    },
    { id:       'violence-bloodshed',
      versions: ['1.0', '1.1']
    },
    { id:       'violence-sexual',
      versions: ['1.0', '1.1']
    },
    { id:       'violence-desecration',
      versions: ['1.1']
    },
    { id:       'violence-slavery',
      versions: ['1.1']
    },
    { id:       'violence-worship',
      versions: ['1.1']
    },
    { id:       'drugs-alcohol',
      versions: ['1.0', '1.1']
    },
    { id:       'drugs-narcotics',
      versions: ['1.0', '1.1']
    },
    { id:       'drugs-tobacco',
      versions: ['1.0', '1.1']
    },
    { id:       'sex-nudity',
      versions: ['1.0', '1.1']
    },
    { id:       'sex-themes',
      versions: ['1.0', '1.1']
    },
    { id:       'sex-homosexuality',
      versions: ['1.1']
    },
    { id:       'sex-prostitution',
      versions: ['1.1']
    },
    { id:       'sex-adultery',
      versions: ['1.1']
    },
    { id:       'sex-appearance',
      versions: ['1.1']
    },
    { id:       'language-profanity',
      versions: ['1.0', '1.1']
    },
    { id:       'language-humor',
      versions: ['1.0', '1.1']
    },
    { id:       'language-discrimination',
      versions: ['1.0', '1.1']
    },
    { id:       'social-chat',
      versions: ['1.0', '1.1']
    },
    { id:       'social-info',
      versions: ['1.0', '1.1']
    },
    { id:       'social-audio',
      versions: ['1.0', '1.1']
    },
    { id:       'social-location',
      versions: ['1.0', '1.1']
    },
    { id:       'social-contacts',
      versions: ['1.0', '1.1']
    },
    { id:       'money-purchasing',
      versions: ['1.0', '1.1']
    },
    { id:       'money-gambling',
      versions: ['1.0', '1.1']
    },
  ];

  var e = document.getElementById('api-version');
  var api_version = e.options[e.selectedIndex].value;

  // generate the XML
  xml = '  <content_rating type="oars-' + api_version + '">\n'
  for (var i in cats) {
    var e = document.getElementById(cats[i].id);
    if (!cats[i].versions.includes(api_version))
      continue
    var val = e.options[e.selectedIndex].value;
    xml += '    <content_attribute id="' + cats[i].id + '">' + val + '</content_attribute>\n'
  }
  xml += '  </content_rating>\n'
  document.getElementById('appdata_oars').value = xml;

  // disable elements when the API version is too old
  for (var i in cats) {
    var e = document.getElementById(cats[i].id);
    var enabled = cats[i].versions.includes(api_version);
    e.disabled = !enabled;
  }

  // hide tabs when not required
  var sections = [
    { section:  'violence',
      kinds:    ['game-online', 'game-offline']
    },
    { section:  'drugs',
      kinds:    ['game-online', 'game-offline']
    },
    { section:  'sex',
      kinds:    ['game-online', 'game-offline']
    },
    { section:  'language',
      kinds:    ['game-online', 'game-offline']
    },
    { section:  'social',
      kinds:    ['game-online', 'app-online', 'app-offline']
    },
    { section:  'money',
      kinds:    ['game-online', 'game-offline', 'app-online', 'app-offline']
    }
  ];

  var e = document.getElementById('component-kind');
  var val = e.options[e.selectedIndex].value;
  for (var i in sections) {
    var section = sections[i].section;
    var e = document.getElementById('tab-' + section);
    e.style.display = "none";
    for (var j in sections[i].kinds) {
      if (sections[i].kinds[j] == val)
        e.style.display = "block";
    }
  }
}
