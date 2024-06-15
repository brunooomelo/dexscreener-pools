function adicionarProporcaoVolumeLiquidez() {
  setInterval(() => {
    const rows = document.querySelectorAll(".ds-dex-table-row");

    rows.forEach((row) => {
      const poolv2 = row.querySelector(".ds-dex-table-row-badge.ds-dex-table-row-badge-label")
      if (poolv2?.innerText.includes('V2')) {
        row.style.display = 'none';
        return
      }
      const volumeCell = row.querySelector(".ds-table-data-cell:nth-child(4)");
      const volumeText = volumeCell.textContent.trim();
      const liquidityCell = row.querySelector(
        ".ds-table-data-cell:nth-child(10)",
      );
      const liquidityText = liquidityCell.textContent.trim();

      const convertToNumber = (text) => {
        const numberString = text.replace(/[^\d.-]/g, "");
        if (text.includes("M")) {
          return parseFloat(numberString) * 1000000;
        } else if (text.includes("K")) {
          return parseFloat(numberString) * 1000;
        } else {
          return parseFloat(numberString);
        }
      };

      const volumeValue = convertToNumber(volumeText);
      const liquidityValue = convertToNumber(liquidityText);

      const proporcao = (volumeValue / liquidityValue).toFixed(2);

      const tokenCell = row.querySelector(".ds-table-data-cell:nth-child(2)");

      let proporcaoElement = tokenCell.querySelector(".proporcao-element");
      if (!proporcaoElement) {
        proporcaoElement = document.createElement("span");
        proporcaoElement.className = "proporcao-element";
        proporcaoElement.style.marginLeft = "5px"; // Adicione margem para separar do nome do token
        tokenCell.appendChild(proporcaoElement);
      }

      proporcaoElement.textContent = ` (${proporcao}X)`;
      const badge = row.querySelector(".ds-dex-table-row-badge-pair-no");
      if (proporcao > 10) {
        badge.style.color = "#FFC0CB"; // pink
        badge.style.opacity = "1";
      } else if (proporcao > 5) {
        badge.style.color = "#008000"; // green
        badge.style.opacity = "1";
      } else if (proporcao > 2) {
        badge.style.color = "#FFFF00"; // yellow
        badge.style.opacity = "1";
      } else {
        badge.style.color = "";
        badge.style.opacity = "1";
      }
    });
  }, 1000);
}

adicionarProporcaoVolumeLiquidez();
