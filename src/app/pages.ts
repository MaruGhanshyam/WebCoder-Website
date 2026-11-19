import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

interface Article {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  introduction: string;
  sections: ArticleSection[];
  takeaways: string[];
}

// Original editorial examples, not case studies or claims about client results.
const ARTICLES: Article[] = [
  {
    slug: 'planning-a-website-that-works-for-your-business',
    category: 'Web Development',
    title: 'A practical guide to planning a website that works for your business',
    summary: 'Start with the people, decisions, and useful actions behind a better website—not just a list of pages.',
    readingTime: '6 min read',
    introduction: 'A useful website does more than look polished. It helps the right people understand what you offer and take a sensible next step. A little planning before design and development can make that experience clearer for everyone.',
    sections: [
      {
        heading: 'Start with a job to be done',
        paragraphs: [
          'Write down who the site needs to serve and what each visitor is trying to accomplish. A prospective customer may need to compare services, while an existing customer may be looking for support. Those are different journeys and deserve different paths.',
          'Choose a small number of meaningful actions, such as requesting a conversation or exploring a service. Use those actions to decide what belongs on each page rather than asking every page to do everything.',
        ],
      },
      {
        heading: 'Organize the content before the interface',
        paragraphs: [
          'List the questions visitors are likely to ask, then group the answers into a simple navigation. Use plain language for labels and headings. If the content is hard to explain in an outline, visual design alone will not make it easier to understand.',
          'Gather the material you can verify: service descriptions, process details, imagery you have permission to use, and contact information. Leave out statistics or testimonials that cannot be substantiated.',
        ],
      },
      {
        heading: 'Make quality part of the brief',
        paragraphs: [
          'Plan for responsive layouts, keyboard access, readable contrast, and fast-loading pages from the beginning. Consider how content will be updated and who will be responsible for maintaining it after launch.',
          'Before publishing, test the primary journeys on different screen sizes and assistive technologies. A launch checklist and a plan for ongoing review are as important as the launch itself.',
        ],
      },
    ],
    takeaways: ['Define the people and actions the site should support.', 'Shape navigation around real questions and verified content.', 'Include accessibility, performance, and maintenance in the brief.'],
  },
  {
    slug: 'when-to-connect-crm-and-erp',
    category: 'Business Systems',
    title: 'When should your CRM and ERP work together?',
    summary: 'A clear starting point for thinking about connected customer and operational data.',
    readingTime: '5 min read',
    introduction: 'Customer relationship management (CRM) and enterprise resource planning (ERP) systems serve different purposes. Connecting them can help teams work from more consistent information, but an integration is only useful when it supports a real workflow.',
    sections: [
      {
        heading: 'Find the handoff that needs attention',
        paragraphs: [
          'Map what happens when an opportunity becomes an order, a customer asks for an update, or an invoice needs to be prepared. Note where information is copied, re-entered, delayed, or difficult to verify.',
          'Talk with the people doing the work. Their understanding of exceptions and workarounds is essential to deciding what should—and should not—be automated.',
        ],
      },
      {
        heading: 'Agree on ownership of the data',
        paragraphs: [
          'For each piece of information, decide which system is authoritative and who can change it. Customer names, addresses, product details, and order statuses may each have different owners.',
          'Define what happens when records conflict, a required field is missing, or a sync fails. A clear process for reviewing errors is more valuable than assuming every transfer will succeed.',
        ],
      },
      {
        heading: 'Start with a manageable connection',
        paragraphs: [
          'Choose one useful workflow and document its triggers, fields, permissions, and expected outcomes. Test with representative data in a safe environment before connecting production systems.',
          'Plan for monitoring, maintenance, and changes to either platform. Integration is an ongoing responsibility, not simply a one-time switch.',
        ],
      },
    ],
    takeaways: ['Map a specific workflow before selecting a solution.', 'Define the source of truth and a process for exceptions.', 'Test a small integration and plan for its upkeep.'],
  },
  {
    slug: 'choosing-the-right-mobile-app-approach',
    category: 'Mobile Applications',
    title: 'Choosing the right approach for your mobile app',
    summary: 'How to weigh user needs, device capabilities, and long-term maintenance before choosing a platform.',
    readingTime: '5 min read',
    introduction: 'A mobile app should solve a problem that is genuinely better addressed on a phone or tablet. The right technical approach follows from that need, the intended audience, and the realities of maintaining the product.',
    sections: [
      {
        heading: 'Understand the context of use',
        paragraphs: [
          'Consider where people will use the product and what they need to do quickly. Are they on the move, working with intermittent connectivity, or relying on a camera? Those details can shape the experience more than a feature wish list.',
          'Identify the core journey and test it with a simple prototype. A focused first release can make it easier to learn which features are actually useful.',
        ],
      },
      {
        heading: 'Compare the available paths',
        paragraphs: [
          'Native apps use platform-specific tools and can be a good fit when deep platform integration is important. Cross-platform development can share more code across devices, while a responsive web app may be appropriate when browser access is the priority.',
          'Each option has tradeoffs in capability, delivery, testing, and maintenance. Evaluate them against the requirements rather than assuming one is always cheaper or better.',
        ],
      },
      {
        heading: 'Plan for the product after launch',
        paragraphs: [
          'Include accessibility, privacy, account security, and device testing in the initial scope. If an app store is involved, allow time for its submission and review requirements.',
          'Decide who will manage updates, support requests, operating-system changes, and analytics. The work of caring for a product continues after the first version ships.',
        ],
      },
    ],
    takeaways: ['Start with the context in which people will use the app.', 'Choose a platform based on requirements and tradeoffs.', 'Budget time for testing, support, and updates.'],
  },
  {
    slug: 'a-responsible-start-with-ai-automation',
    category: 'AI & Automation',
    title: 'A responsible starting point for AI automation',
    summary: 'Identify a useful workflow, keep people in control, and evaluate outcomes with care.',
    readingTime: '6 min read',
    introduction: 'AI can assist with repetitive information work, but it is not a substitute for understanding the process. A responsible starting point is a bounded task with a clear owner, a way to review results, and a plan for handling sensitive information.',
    sections: [
      {
        heading: 'Choose a narrow, observable task',
        paragraphs: [
          'Look for work that involves repeated steps, such as organizing incoming requests or drafting a first-pass summary. Describe the current process, the input it needs, and what a useful output would look like.',
          'Avoid starting with a high-stakes decision that requires judgment or accountability. The goal of an early experiment is to learn, not to remove necessary oversight.',
        ],
      },
      {
        heading: 'Design for review and privacy',
        paragraphs: [
          'Identify what information the workflow will process and whether it can be shared with a proposed tool. Follow applicable privacy obligations, use the minimum information needed, and set appropriate access controls.',
          'Give a person a clear opportunity to check, edit, and reject outputs. AI-generated content can be incomplete or incorrect, so important facts should be verified against reliable sources.',
        ],
      },
      {
        heading: 'Evaluate before expanding',
        paragraphs: [
          'Create a representative set of examples and compare results against criteria that matter to the team, such as usefulness, error rates, and review effort. Include unusual and difficult cases, not just easy ones.',
          'Document limitations, monitor the workflow, and make it easy to pause or change. Expand only when the evidence and the people responsible for the process support doing so.',
        ],
      },
    ],
    takeaways: ['Begin with a bounded task and a clear owner.', 'Protect sensitive data and retain human review.', 'Evaluate real examples before expanding the workflow.'],
  },
  {
    slug: 'building-a-useful-digital-marketing-foundation',
    category: 'Digital Marketing',
    title: 'Building a useful digital marketing foundation',
    summary: 'Connect your audience, content, and measurement before adding more channels.',
    readingTime: '5 min read',
    introduction: 'Digital marketing becomes more useful when the message, destination, and measurement work together. Instead of trying every channel at once, begin with a clear audience and a question you want to answer.',
    sections: [
      {
        heading: 'Make the audience and offer specific',
        paragraphs: [
          'Describe the people you want to reach, the problem you can help them address, and the information they need before taking action. Use language they would recognize rather than internal terminology.',
          'Choose one realistic next step and make sure the destination delivers on the promise of the message. A relevant landing page is more useful than sending every visitor to the same generic page.',
        ],
      },
      {
        heading: 'Create content that earns attention',
        paragraphs: [
          'Answer genuine questions with clear, accurate content. Search-friendly structure, descriptive headings, and accessible pages help people find and use the information; they are not a shortcut around quality.',
          'For paid or social campaigns, match the creative to the channel and keep claims verifiable. Check that any imagery, customer stories, and quotations are used with permission.',
        ],
      },
      {
        heading: 'Measure and improve thoughtfully',
        paragraphs: [
          'Decide what you need to learn before setting up measurement. Depending on the goal, that could mean understanding which content is useful or where visitors encounter friction.',
          'Respect applicable consent and privacy requirements when choosing analytics tools. Review results regularly, change one meaningful element at a time, and avoid treating every short-term fluctuation as a trend.',
        ],
      },
    ],
    takeaways: ['Connect a specific audience to a relevant next step.', 'Prioritize accurate, useful, accessible content.', 'Measure with a purpose and respect privacy.'],
  },
];

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <section class="page-hero overflow-hidden bg-[#f4f8fa]">
        <div class="container grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p class="eyebrow mb-5">About WebCoder</p>
            <h1 class="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#0d354b] sm:text-5xl lg:text-6xl">Building Digital Experiences That Drive <span class="text-[#ed1c24]">Business Growth.</span></h1>
            <p class="section-copy mt-7 max-w-xl text-lg leading-8">Good technology starts with a better question: what will make work simpler, experiences better, and ideas more useful? That is where we begin.</p>
            <div class="mt-9 flex flex-wrap gap-3">
              <a routerLink="/services" class="button button-primary">Explore our services <span aria-hidden="true">↗</span></a>
              <a routerLink="/contact" class="button button-outline">Start a conversation</a>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l-2 border-t-2 border-[#ed1c24]" aria-hidden="true"></div>
            <img src="https://images.pexels.com/photos/23496704/pexels-photo-23496704.jpeg" alt="A contemporary workspace" class="relative h-[340px] w-full rounded-2xl object-cover sm:h-[440px]" />
            <div class="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-5 shadow-xl sm:left-auto sm:max-w-[260px]">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#ed1c24]">Our approach</p>
              <p class="mt-2 text-base font-semibold leading-6 text-[#0d354b]">Thoughtful strategy. Practical execution.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p class="eyebrow mb-4">The bigger picture</p>
            <h2 class="section-title max-w-md">A clear direction for a changing digital world.</h2>
          </div>
          <div class="grid gap-8 sm:grid-cols-2">
            <div class="border-t-2 border-[#ed1c24] pt-6">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#ed1c24]">01 / Vision</p>
              <h3 class="mt-4 text-2xl font-semibold text-[#0d354b]">Make technology feel more human.</h3>
              <p class="section-copy mt-4 leading-7">We envision digital experiences that are accessible, intuitive, and genuinely useful to the people who depend on them.</p>
            </div>
            <div class="border-t-2 border-[#0d354b] pt-6">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-[#0d354b]">02 / Mission</p>
              <h3 class="mt-4 text-2xl font-semibold text-[#0d354b]">Turn good ideas into useful tools.</h3>
              <p class="section-copy mt-4 leading-7">Our mission is to connect thoughtful design and practical technology with the real needs of businesses and their audiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section bg-[#f4f8fa]">
        <div class="container">
          <div class="max-w-2xl">
            <p class="eyebrow mb-4">What guides us</p>
            <h2 class="section-title">The principles behind the work.</h2>
            <p class="section-copy mt-5">The best outcomes begin with a shared understanding and a considered way of working.</p>
          </div>
          <div class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @for (value of values; track value.title; let i = $index) {
              <article class="surface-card flex h-full flex-col rounded-2xl bg-white p-7">
                <span class="text-sm font-semibold text-[#ed1c24]">0{{ i + 1 }} /</span>
                <h3 class="mt-10 text-xl font-semibold text-[#0d354b]">{{ value.title }}</h3>
                <p class="section-copy mt-3 leading-7">{{ value.description }}</p>
              </article>
            }
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p class="eyebrow mb-4">Our expertise</p>
            <h2 class="section-title max-w-lg">Connected thinking, from idea to implementation.</h2>
            <p class="section-copy mt-5 max-w-lg leading-8">From customer-facing experiences to the systems behind them, we bring the pieces together with an eye on what matters to your business.</p>
            <a routerLink="/services" class="text-link mt-7 inline-flex items-center gap-2 font-semibold text-[#ed1c24]">See what we do <span aria-hidden="true">↗</span></a>
          </div>
          <div class="divide-y divide-slate-200 border-y border-slate-200">
            @for (item of expertise; track item.title) {
              <div class="flex gap-5 py-6">
                <span class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f8fa] text-[#ed1c24]" aria-hidden="true">↗</span>
                <div><h3 class="text-lg font-semibold text-[#0d354b]">{{ item.title }}</h3><p class="section-copy mt-2 leading-7">{{ item.description }}</p></div>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section pt-0">
        <div class="container">
          <div class="rounded-2xl bg-[#0d354b] px-7 py-12 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:py-16">
            <div><p class="text-xs font-bold uppercase tracking-[0.2em] text-[#ff9094]">Let's make something useful</p><h2 class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Have an idea worth exploring?</h2><p class="mt-4 max-w-xl leading-7 text-slate-200">Tell us what you are working on and where you would like to go next.</p></div>
            <a routerLink="/contact" class="button button-primary mt-8 inline-flex shrink-0 lg:mt-0">Talk about your project <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class AboutPage {
  readonly values = [
    { title: 'Clarity first', description: 'Ask good questions, share context, and make the complex easier to understand.' },
    { title: 'People at the center', description: 'Design for the real people using and maintaining the things we build.' },
    { title: 'Thoughtful craft', description: 'Care about the details, from the first interaction to the systems underneath.' },
    { title: 'Better together', description: 'Work openly and collaboratively, with room to listen, learn, and improve.' },
  ];
  readonly expertise = [
    { title: 'Digital experiences', description: 'Websites and mobile applications designed around useful, intuitive journeys.' },
    { title: 'Connected operations', description: 'CRM, ERP, and integrations that support the way your teams work.' },
    { title: 'Smarter ways to work', description: 'Purposeful automation and digital marketing grounded in clear objectives.' },
  ];
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <section class="page-hero bg-[#f4f8fa]">
        <div class="container py-16 md:py-24">
          <p class="eyebrow mb-5">What we do</p>
          <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <h1 class="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#0d354b] sm:text-5xl lg:text-6xl">The right technology for <span class="text-[#ed1c24]">what's next.</span></h1>
            <p class="section-copy max-w-xl text-lg leading-8">From a first idea to the tools that keep a business moving, explore practical digital services built around your goals.</p>
          </div>
          <nav aria-label="Jump to a service" class="mt-10 flex flex-wrap gap-2">
            @for (service of services; track service.id) {
              <a [routerLink]="['/services']" [fragment]="service.id" class="pill inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[#0d354b] transition hover:border-[#ed1c24] hover:text-[#ed1c24]">{{ service.title }} <span class="ml-2" aria-hidden="true">↓</span></a>
            }
          </nav>
        </div>
      </section>

      @for (service of services; track service.id; let i = $index) {
        <section [id]="service.id" class="section scroll-mt-24" [class.bg-[#f4f8fa]]="i % 2 === 1">
          <div class="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p class="text-sm font-bold uppercase tracking-[0.18em] text-[#ed1c24]">0{{ i + 1 }} / {{ service.label }}</p>
              <h2 class="section-title mt-4 max-w-lg">{{ service.title }}</h2>
              <p class="section-copy mt-5 max-w-lg text-lg leading-8">{{ service.description }}</p>
              <a routerLink="/contact" [queryParams]="{ service: service.title }" class="button button-outline mt-7 inline-flex">Discuss this service <span aria-hidden="true">↗</span></a>
            </div>
            <div class="surface-card rounded-2xl border border-slate-200 bg-white p-6 sm:p-9">
              <h3 class="text-xs font-bold uppercase tracking-[0.16em] text-[#ed1c24]">What we can help with</h3>
              <ul class="mt-5 grid gap-4 sm:grid-cols-2">
                @for (feature of service.features; track feature) {
                  <li class="flex items-start gap-3 text-sm font-medium leading-6 text-[#102e40]"><span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs text-[#ed1c24]" aria-hidden="true">✓</span>{{ feature }}</li>
                }
              </ul>
              <div class="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div><h3 class="text-xs font-bold uppercase tracking-[0.16em] text-[#0d354b]">Business applications</h3><p class="section-copy mt-3 text-sm leading-7">{{ service.applications }}</p></div>
                <div><h3 class="text-xs font-bold uppercase tracking-[0.16em] text-[#0d354b]">Technology &amp; tools</h3><p class="section-copy mt-3 text-sm leading-7">{{ service.technology }}</p></div>
              </div>
            </div>
          </div>
        </section>
      }

      <section class="section bg-[#0d354b] text-white">
        <div class="container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div><p class="text-xs font-bold uppercase tracking-[0.2em] text-[#ff9094]">Not sure where to start?</p><h2 class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Let's find the right solution together.</h2><p class="mt-4 max-w-xl leading-7 text-slate-200">Tell us about the challenge. We can start with the goals, not the jargon.</p></div>
          <a routerLink="/contact" class="button button-primary inline-flex self-start lg:self-auto">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  `,
})
export class ServicesPage {
  readonly services = [
    {
      id: 'web-development', label: 'Digital experiences', title: 'Web Development',
      description: 'Thoughtful websites and web applications that help people find information, take action, and get things done.',
      features: ['Business and e-commerce websites', 'Custom web applications', 'WordPress development', 'Responsive and accessible experiences'],
      applications: 'Business websites, online stores, customer portals, booking journeys, and internal tools.',
      technology: 'HTML5, CSS3, JavaScript, TypeScript, Angular, React, WordPress, WooCommerce, and PHP.',
    },
    {
      id: 'crm-erp', label: 'Connected operations', title: 'CRM & ERP',
      description: 'Bring customer information and operational workflows closer together, with systems shaped around how your team works.',
      features: ['Workflow and requirements mapping', 'CRM and ERP customization', 'System integrations and data flows', 'Dashboards and process visibility'],
      applications: 'Sales pipelines, customer support, order management, inventory, and reporting.',
      technology: 'CRM and ERP platforms, .NET, MySQL, secure APIs, and integration tools.',
    },
    {
      id: 'mobile-applications', label: 'On-the-go experiences', title: 'Mobile Applications',
      description: 'Useful mobile experiences designed for the moments and places where your users need them most.',
      features: ['Product discovery and prototyping', 'iOS and Android app experiences', 'API and platform integrations', 'Testing and ongoing iteration'],
      applications: 'Customer self-service, field operations, booking, and productivity tools.',
      technology: 'Android, iOS, and cross-platform tools such as Flutter, selected to fit project requirements.',
    },
    {
      id: 'ai-automation', label: 'Smarter workflows', title: 'AI Automation',
      description: 'Explore practical ways to reduce repetitive work while keeping people, privacy, and review in the loop.',
      features: ['Workflow discovery and assessment', 'AI-assisted content and summaries', 'Task and process automation', 'Human review and evaluation'],
      applications: 'Request triage, knowledge discovery, document processing, and internal workflows.',
      technology: 'AI tools, n8n, workflow platforms, APIs, and existing business systems.',
    },
    {
      id: 'digital-marketing', label: 'Meaningful visibility', title: 'Digital Marketing',
      description: 'Connect the right message with the right audience through useful content and considered digital campaigns.',
      features: ['Audience and channel planning', 'Search-friendly content strategy', 'Campaign and landing page support', 'Privacy-conscious measurement planning'],
      applications: 'Service launches, content discovery, audience engagement, and lead generation.',
      technology: 'Tools may include search platforms, content systems, and consent-aware analytics.',
    },
  ];

  constructor() {
    inject(ActivatedRoute).fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
      if (fragment && typeof document !== 'undefined') {
        setTimeout(() => document.getElementById(fragment)?.scrollIntoView(), 0);
      }
    });
  }
}

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main>
      <section class="page-hero bg-[#f4f8fa]">
        <div class="container py-16 md:py-24">
          <p class="eyebrow mb-5">The WebCoder journal</p>
          <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <h1 class="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#0d354b] sm:text-5xl lg:text-6xl">Ideas for a more <span class="text-[#ed1c24]">thoughtful</span> digital world.</h1>
            <p class="section-copy max-w-xl text-lg leading-8">Practical perspectives on building better digital experiences, connected systems, and smarter ways of working.</p>
          </div>
          <p class="mt-7 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600">These are original sample editorial guides, provided for illustration—not client case studies.</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div><p class="eyebrow mb-3">Explore the journal</p><h2 class="text-3xl font-semibold tracking-tight text-[#0d354b]">Find an idea to take further.</h2></div>
            <div class="w-full lg:max-w-xs"><label for="article-search" class="mb-2 block text-sm font-semibold text-[#0d354b]">Search articles</label><input id="article-search" type="search" name="search" [(ngModel)]="search" placeholder="Search by topic or keyword" class="form-input w-full" /></div>
          </div>
          <div class="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
            @for (category of categories; track category) {
              <button type="button" (click)="selectedCategory = category" [attr.aria-pressed]="selectedCategory === category" class="pill rounded-full border px-4 py-2 text-sm font-medium transition" [class.bg-[#0d354b]]="selectedCategory === category" [class.text-white]="selectedCategory === category" [class.border-[#0d354b]]="selectedCategory === category" [class.border-slate-200]="selectedCategory !== category" [class.text-[#0d354b]]="selectedCategory !== category">{{ category }}</button>
            }
          </div>
          <p class="mt-6 text-sm text-slate-500" aria-live="polite">{{ filteredArticles.length }} {{ filteredArticles.length === 1 ? 'article' : 'articles' }} found</p>
          @if (filteredArticles.length) {
            <div class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              @for (article of filteredArticles; track article.slug; let i = $index) {
                <article class="surface-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                  <div class="relative flex h-36 items-end overflow-hidden bg-[#0d354b] p-6" [class.bg-[#e8f1f4]]="i % 2 === 1">
                    <div class="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/20" aria-hidden="true"></div><div class="absolute right-8 top-4 h-28 w-28 rounded-full border border-[#ed1c24]/50" aria-hidden="true"></div>
                    <span class="relative rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0d354b]">{{ article.category }}</span>
                  </div>
                  <div class="flex flex-1 flex-col p-6 sm:p-7">
                    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">WebCoder editorial (sample) <span aria-hidden="true">/</span> Unpublished <span aria-hidden="true">/</span> {{ article.readingTime }}</p>
                    <h3 class="mt-4 text-xl font-semibold leading-snug text-[#0d354b]"><a [routerLink]="['/blog', article.slug]" class="hover:text-[#ed1c24]">{{ article.title }}</a></h3>
                    <p class="section-copy mt-3 flex-1 text-sm leading-7">{{ article.summary }}</p>
                    <a [routerLink]="['/blog', article.slug]" class="text-link mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#ed1c24]" [attr.aria-label]="'Read ' + article.title">Read article <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              }
            </div>
          } @else {
            <div class="mt-8 rounded-2xl bg-[#f4f8fa] p-8 text-center sm:p-12"><h3 class="text-xl font-semibold text-[#0d354b]">No articles found</h3><p class="section-copy mt-2">Try another search or explore all categories.</p><button type="button" (click)="clearFilters()" class="button button-outline mt-6">Clear filters</button></div>
          }
        </div>
      </section>
    </main>
  `,
})
export class BlogPage {
  readonly categories = ['All', 'Web Development', 'Business Systems', 'Mobile Applications', 'AI & Automation', 'Digital Marketing'];
  search = '';
  selectedCategory = 'All';

  get filteredArticles(): Article[] {
    const query = this.search.trim().toLowerCase();
    return ARTICLES.filter((article) =>
      (this.selectedCategory === 'All' || article.category === this.selectedCategory) &&
      (!query || [article.title, article.summary, article.category, article.introduction, ...article.takeaways, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs])].some((text) => text.toLowerCase().includes(query))),
    );
  }

  clearFilters(): void {
    this.search = '';
    this.selectedCategory = 'All';
  }
}

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main>
      @if (article$ | async; as article) {
        <section class="page-hero bg-[#f4f8fa]">
          <div class="container py-16 md:py-20">
            <a routerLink="/blog" class="text-link inline-flex items-center gap-2 text-sm font-semibold text-[#0d354b]"><span aria-hidden="true">←</span> Back to the journal</a>
            <div class="mx-auto mt-12 max-w-3xl">
              <div class="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.15em]"><span class="rounded-full bg-white px-3 py-2 text-[#ed1c24]">{{ article.category }}</span><span class="text-slate-500">WebCoder editorial (sample) / Unpublished / {{ article.readingTime }}</span></div>
              <h1 class="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[#0d354b] sm:text-5xl">{{ article.title }}</h1>
              <p class="section-copy mt-6 text-lg leading-8">{{ article.summary }}</p>
            </div>
          </div>
        </section>
        <article class="section">
          <div class="container mx-auto max-w-3xl">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-[#ed1c24]">An original sample editorial guide</p>
            <p class="mt-6 text-xl leading-9 text-[#102e40]">{{ article.introduction }}</p>
            @for (section of article.sections; track section.heading) {
              <section class="mt-12"><h2 class="text-2xl font-semibold tracking-tight text-[#0d354b]">{{ section.heading }}</h2>@for (paragraph of section.paragraphs; track paragraph) {<p class="section-copy mt-4 leading-8">{{ paragraph }}</p>}</section>
            }
            <aside class="mt-12 rounded-2xl bg-[#f4f8fa] p-7 sm:p-9"><h2 class="text-xl font-semibold text-[#0d354b]">A few things to remember</h2><ul class="mt-5 space-y-3">@for (takeaway of article.takeaways; track takeaway) {<li class="flex gap-3 leading-7 text-[#102e40]"><span class="font-bold text-[#ed1c24]" aria-hidden="true">✓</span>{{ takeaway }}</li>}</ul></aside>
            <div class="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-8"><a routerLink="/blog" class="text-link font-semibold text-[#0d354b]"><span aria-hidden="true">←</span> All articles</a><a routerLink="/contact" class="button button-primary">Discuss an idea <span aria-hidden="true">↗</span></a></div>
          </div>
        </article>
      } @else {
        <section class="section bg-[#f4f8fa]"><div class="container py-12 text-center"><p class="eyebrow mb-4">Article not found</p><h1 class="section-title">This story isn't here.</h1><p class="section-copy mx-auto mt-4 max-w-lg">The link may have changed, or this sample article may not exist. Explore the journal for more ideas.</p><a routerLink="/blog" class="button button-primary mt-8 inline-flex">Browse articles <span aria-hidden="true">↗</span></a></div></section>
      }
    </main>
  `,
})
export class ArticlePage {
  readonly article$ = inject(ActivatedRoute).paramMap.pipe(
    map((params) => ARTICLES.find((article) => article.slug === params.get('slug'))),
  );
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main>
      <section class="page-hero bg-[#f4f8fa]">
        <div class="container py-16 md:py-24"><p class="eyebrow mb-5">Get in touch</p><div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"><h1 class="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#0d354b] sm:text-5xl lg:text-6xl">Let's Discuss Your <span class="text-[#ed1c24]">Next Project.</span></h1><p class="section-copy max-w-xl text-lg leading-8">Tell us a little about your idea, your challenge, or simply where you would like to begin.</p></div></div>
      </section>
      <section class="section">
        <div class="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <aside>
            <p class="eyebrow mb-4">Start with a hello</p><h2 class="section-title">A good conversation starts here.</h2><p class="section-copy mt-5 leading-8">Share the details you have—even if your idea is still taking shape. The form creates a text inquiry you can save for later.</p>
            <div class="mt-8 rounded-2xl bg-[#f4f8fa] p-6"><h3 class="font-semibold text-[#0d354b]">Contact details</h3><dl class="mt-5 space-y-4 text-sm"><div><dt class="font-semibold text-[#0d354b]">Email</dt><dd class="mt-1 leading-6 text-slate-600"><a class="text-link" href="mailto:webcoder37&#64;gmail.com">webcoder37&#64;gmail.com</a></dd></div><div><dt class="font-semibold text-[#0d354b]">Phone</dt><dd class="mt-1 leading-6 text-slate-600"><a class="text-link" href="tel:+918238430102">+91 82384 30102</a></dd></div><div><dt class="font-semibold text-[#0d354b]">Location</dt><dd class="mt-1 leading-6 text-slate-600">Office location to be confirmed.</dd></div></dl></div>
            <p class="mt-6 text-sm leading-6 text-slate-500">Online delivery requires a connected form endpoint. No inquiry is sent from this page.</p>
          </aside>
          <div class="surface-card rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
            <div class="border-b border-slate-200 pb-7"><p class="text-xs font-bold uppercase tracking-[0.16em] text-[#ed1c24]">Your project</p><h2 class="mt-3 text-2xl font-semibold text-[#0d354b]">Tell us a little more.</h2><p class="section-copy mt-2 text-sm leading-6">Fields marked required are needed to prepare your inquiry.</p></div>
            <form #inquiryForm="ngForm" (ngSubmit)="downloadInquiry(inquiryForm)" novalidate class="mt-7 space-y-6">
              @if (inquiryForm.submitted && inquiryForm.invalid) {<div role="alert" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">Please check the required fields and correct the errors below.</div>}
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="form-field"><label for="contact-name" class="mb-2 block text-sm font-semibold text-[#0d354b]">Name <span class="text-[#ed1c24]">(required)</span></label><input id="contact-name" name="name" type="text" autocomplete="name" required maxlength="100" pattern=".*\\S.*" [(ngModel)]="inquiry.name" #nameField="ngModel" [attr.aria-invalid]="nameField.invalid && (nameField.touched || inquiryForm.submitted) ? 'true' : null" [attr.aria-describedby]="nameField.invalid && (nameField.touched || inquiryForm.submitted) ? 'name-error' : null" class="form-input w-full" placeholder="Your name" />@if (nameField.invalid && (nameField.touched || inquiryForm.submitted)) {<p id="name-error" class="mt-2 text-sm text-red-700">Enter your name.</p>}</div>
                <div class="form-field"><label for="contact-email" class="mb-2 block text-sm font-semibold text-[#0d354b]">Email <span class="text-[#ed1c24]">(required)</span></label><input id="contact-email" name="email" type="email" autocomplete="email" required email maxlength="254" [(ngModel)]="inquiry.email" #emailField="ngModel" [attr.aria-invalid]="emailField.invalid && (emailField.touched || inquiryForm.submitted) ? 'true' : null" [attr.aria-describedby]="emailField.invalid && (emailField.touched || inquiryForm.submitted) ? 'email-error' : null" class="form-input w-full" placeholder="Your email address" />@if (emailField.invalid && (emailField.touched || inquiryForm.submitted)) {<p id="email-error" class="mt-2 text-sm text-red-700">Enter a valid email address.</p>}</div>
                <div class="form-field"><label for="contact-phone" class="mb-2 block text-sm font-semibold text-[#0d354b]">Phone <span class="font-normal text-slate-500">(optional)</span></label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" [(ngModel)]="inquiry.phone" class="form-input w-full" placeholder="Your phone number" /></div>
                <div class="form-field"><label for="contact-company" class="mb-2 block text-sm font-semibold text-[#0d354b]">Company <span class="font-normal text-slate-500">(optional)</span></label><input id="contact-company" name="company" type="text" autocomplete="organization" maxlength="100" [(ngModel)]="inquiry.company" class="form-input w-full" placeholder="Your company or organization" /></div>
                <div class="form-field"><label for="contact-service" class="mb-2 block text-sm font-semibold text-[#0d354b]">Service <span class="text-[#ed1c24]">(required)</span></label><select id="contact-service" name="service" required [(ngModel)]="inquiry.service" #serviceField="ngModel" [attr.aria-invalid]="serviceField.invalid && (serviceField.touched || inquiryForm.submitted) ? 'true' : null" [attr.aria-describedby]="serviceField.invalid && (serviceField.touched || inquiryForm.submitted) ? 'service-error' : null" class="form-input w-full"><option value="">Select a service</option>@for (service of services; track service) {<option [value]="service">{{ service }}</option>}<option value="Not sure yet">Not sure yet</option></select>@if (serviceField.invalid && (serviceField.touched || inquiryForm.submitted)) {<p id="service-error" class="mt-2 text-sm text-red-700">Choose a service or select “Not sure yet”.</p>}</div>
                <div class="form-field"><label for="contact-budget" class="mb-2 block text-sm font-semibold text-[#0d354b]">Budget <span class="font-normal text-slate-500">(optional)</span></label><input id="contact-budget" name="budget" type="text" maxlength="100" [(ngModel)]="inquiry.budget" class="form-input w-full" placeholder="A range, or still deciding" /></div>
              </div>
              <div class="form-field"><label for="contact-description" class="mb-2 block text-sm font-semibold text-[#0d354b]">Project description <span class="text-[#ed1c24]">(required)</span></label><textarea id="contact-description" name="description" rows="6" required minlength="10" maxlength="5000" pattern="[\\s\\S]*\\S[\\s\\S]{8,}\\S[\\s\\S]*" [(ngModel)]="inquiry.description" #descriptionField="ngModel" [attr.aria-invalid]="descriptionField.invalid && (descriptionField.touched || inquiryForm.submitted) ? 'true' : null" [attr.aria-describedby]="descriptionField.invalid && (descriptionField.touched || inquiryForm.submitted) ? 'description-hint description-error' : 'description-hint'" class="form-input w-full" placeholder="What would you like to build or improve?"></textarea><p id="description-hint" class="mt-2 text-sm text-slate-500">Share your goals, timeline, or anything else that feels helpful. Please avoid sensitive information.</p>@if (descriptionField.invalid && (descriptionField.touched || inquiryForm.submitted)) {<p id="description-error" class="mt-2 text-sm text-red-700">Add a project description of at least 10 characters.</p>}</div>
              <div><button type="submit" class="button button-primary">Download inquiry <span aria-hidden="true">↓</span></button><p class="mt-3 text-sm leading-6 text-slate-500">This saves a text file on your device; it does not send your information.</p></div>
              @if (downloadRequested) {<p role="status" class="rounded-lg bg-[#f4f8fa] p-4 text-sm leading-6 text-[#0d354b]">Your browser was asked to download your inquiry. Nothing has been sent; online delivery requires a connected form endpoint.</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class ContactPage {
  readonly services = ['Web Development', 'CRM & ERP', 'Mobile Applications', 'AI Automation', 'Digital Marketing'];
  inquiry = { name: '', email: '', phone: '', company: '', service: '', budget: '', description: '' };
  downloadRequested = false;

  constructor() {
    inject(ActivatedRoute).queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const service = params.get('service');
      if (service && this.services.includes(service)) this.inquiry.service = service;
    });
  }

  downloadInquiry(form: NgForm): void {
    this.downloadRequested = false;
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const inquiry = this.inquiry;
    const text = [
      'WebCoder project inquiry',
      'This is a saved copy. It has not been sent.',
      '',
      `Name: ${inquiry.name.trim()}`,
      `Email: ${inquiry.email.trim()}`,
      `Phone: ${inquiry.phone.trim() || 'Not provided'}`,
      `Company: ${inquiry.company.trim() || 'Not provided'}`,
      `Service: ${inquiry.service}`,
      `Budget: ${inquiry.budget.trim() || 'Not provided'}`,
      '',
      'Project description:',
      inquiry.description.trim(),
      '',
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'webcoder-project-inquiry.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.downloadRequested = true;
  }
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main>
      <section class="page-hero bg-[#f4f8fa]"><div class="container py-16 md:py-20"><p class="eyebrow mb-4">Legal information</p><h1 class="text-4xl font-semibold tracking-tight text-[#0d354b] sm:text-5xl">{{ (isTerms$ | async) ? 'Terms of Use' : 'Privacy Notice' }}</h1><p class="section-copy mt-5 max-w-2xl leading-8">A starting point for review, not a final legal policy.</p></div></section>
      <section class="section"><div class="container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <aside><div class="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950"><p class="font-semibold">Draft for review</p><p class="mt-2">This sample text must be reviewed and completed by the website owner and qualified legal counsel before publication. It is not legal advice.</p></div><nav aria-label="Legal pages" class="mt-6 flex gap-5 text-sm font-semibold"><a routerLink="/privacy" class="text-link text-[#0d354b]">Privacy</a><a routerLink="/terms" class="text-link text-[#0d354b]">Terms</a></nav></aside>
        <div class="max-w-3xl space-y-10 text-[#102e40]">
          @if (isTerms$ | async) {
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">About these terms</h2><p class="section-copy mt-4 leading-8">This draft outlines topics that may be relevant to use of the WebCoder website. The website owner should identify the legal entity operating the site, applicable jurisdiction, and final terms before relying on this document.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Using the website</h2><p class="section-copy mt-4 leading-8">The final terms should explain permitted use of the site, any prohibited conduct, and the conditions that apply to links or third-party materials. Website information is general and should not be treated as a project-specific agreement.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Services and intellectual property</h2><p class="section-copy mt-4 leading-8">Any services, deliverables, fees, timelines, and ownership arrangements should be set out in a separate written agreement where appropriate. The website owner should confirm the rights and permissions associated with content displayed here.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Further details to complete</h2><p class="section-copy mt-4 leading-8">Review applicable disclaimers, limits of liability, dispute procedures, governing law, and a reliable contact method with legal counsel. These details have not yet been supplied.</p></section>
          } @else {
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">About this notice</h2><p class="section-copy mt-4 leading-8">This draft describes information the website owner should review when preparing a privacy notice. The responsible organization, contact details, applicable laws, and actual data practices must be confirmed before publication.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Information you provide</h2><p class="section-copy mt-4 leading-8">The inquiry form currently creates a text file on your device and does not send it to WebCoder. If online delivery is added, the final notice should explain what information is collected, why it is needed, how it is protected, and how long it is retained.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Cookies, analytics, and service providers</h2><p class="section-copy mt-4 leading-8">The website owner should document any cookies, analytics, hosting, or third-party services actually used, including their purposes and any required consent choices. This draft does not assert which tools are enabled.</p></section>
            <section><h2 class="text-2xl font-semibold text-[#0d354b]">Your choices and contact</h2><p class="section-copy mt-4 leading-8">The final notice should explain applicable privacy rights, how to exercise them, and how to contact the responsible organization. Contact details and response procedures remain to be confirmed.</p></section>
          }
        </div>
      </div></section>
    </main>
  `,
})
export class LegalPage {
  readonly isTerms$ = inject(ActivatedRoute).url.pipe(map((segments) => segments[0]?.path === 'terms'));
}

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="bg-[#f4f8fa]"><section class="section"><div class="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center"><p class="text-sm font-bold uppercase tracking-[0.22em] text-[#ed1c24]">404 / Page not found</p><p class="mt-7 text-8xl font-semibold leading-none tracking-tight text-[#0d354b]/10 sm:text-9xl" aria-hidden="true">404</p><h1 class="mt-4 text-4xl font-semibold tracking-tight text-[#0d354b] sm:text-5xl">Looks like we took a wrong turn.</h1><p class="section-copy mt-5 max-w-lg text-lg leading-8">The page you are looking for may have moved or no longer exists. Let's get you back on track.</p><div class="mt-9 flex flex-wrap justify-center gap-3"><a routerLink="/" class="button button-primary">Back to home <span aria-hidden="true">↗</span></a><a routerLink="/contact" class="button button-outline">Contact us</a></div></div></section></main>
  `,
})
export class NotFoundPage {}
