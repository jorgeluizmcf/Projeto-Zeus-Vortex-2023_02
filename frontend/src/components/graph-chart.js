import { Pie, measureTextWidth } from '@ant-design/plots';

export default function DemoPie({givenData}){
  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'roboto'};">${text}</div>`;
  }

  const data = [
    {
      type: 'Alimentação',
      value: givenData[0],
    },
    {
      type: 'Higiene',
      value: givenData[1],
    },
    {
      type: 'Brinquedos',
      value: givenData[2],
    },
    {
      type: 'Veterinário',
      value: givenData[3],
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#B86D37', '#46719C', '#469C72', '#446957'],
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} R$`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Total';
          return renderStatistic(d, text, {
            fontSize: 8,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '16px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `R$ ${datum.value}` : `R$ ${data.reduce((r, d) => r + d.value, 0).toFixed(2).replace(".", ",")}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
};

