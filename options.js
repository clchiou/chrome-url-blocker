function saveOptions() {
  chrome.storage.sync.set(
    {
      patterns: JSON.parse(document.getElementById('patterns').value),
    },
    () => {
      let saveElement = document.getElementById('save');
      saveElement.textContent = 'Saved!';
      setTimeout(() => { saveElement.textContent = 'Save'; }, 750);
    }
  );
}

function loadOptions() {
  chrome.storage.sync.get(
    {
      patterns: [],
    },
    (items) => {
      document.getElementById('patterns').value =
        JSON.stringify(items.patterns);
    }
  );
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
