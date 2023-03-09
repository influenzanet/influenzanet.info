
export type glossaryLink = {
  text: string,
  url: string
}

export class Glossary{
  title: string
  content: string
  link: glossaryLink

  constructor(title: string, content: string, link: glossaryLink) {
    this.title = title;
    this.content = content;
    this.link = link;
  }
}

// Static Glossary data
export const glossaryList: Glossary[] = [
  {
    title: 'ILI',
    content: `<p>It refers to individuals who reported Influenza Like Illness symptoms.</p>`,
  },
  {
    title: 'Emergency data',
    content: `<p>It refers to the percentage of individuals who went to the Emergency Room (ER) for their symptoms</p>`,
  },
  {
    title: 'GP',
    content: `<p>It refers to the percentage of individuals who consulted a GP for their symptoms</p>`,
  },
  {
    title: 'COVID-19',
    content: `<p>It refers to individuals who reported Influenza COVID-19 like symptoms</p>`,
  },
  {
    title: 'Other',
    content: `<p>It refers to the percentage of individuals who consulted a generic healthcare provider for their symptoms</p>`,
  },
].map((g:Glossary)=>new Glossary(g.title, g.content, g.link))
