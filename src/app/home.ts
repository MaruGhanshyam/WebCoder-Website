import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html'
})
export class HomePage {
  expandedProject = '';

  readonly services = [
    { number: '01', icon: 'web', title: 'Web Development', description: 'Digital experiences that look great and work even better.', items: ['Business Websites', 'E-Commerce Websites', 'Custom Web Applications', 'WordPress Development'], id: 'web-development' },
    { number: '02', icon: 'crm', title: 'CRM & ERP Solutions', description: 'Connected systems that make business flow more smoothly.', items: ['Customer Relationship Management', 'Enterprise Resource Planning', 'Business Management Software', 'Custom Software Solutions'], id: 'crm-erp' },
    { number: '03', icon: 'mobile', title: 'Mobile Application', description: 'Meaningful mobile experiences, wherever your users are.', items: ['Android Applications', 'iOS Applications', 'Cross-Platform Applications', 'Custom Mobile Solutions'], id: 'mobile-applications' },
    { number: '04', icon: 'ai', title: 'AI Automation', description: 'Smarter workflows that give your team room to do more.', items: ['AI-Powered Automation', 'Business Workflow Automation', 'Chatbot Development', 'n8n Automation Integration'], id: 'ai-automation' },
    { number: '05', icon: 'marketing', title: 'Digital Marketing', description: 'Build your presence and connect with the right people.', items: ['Search Engine Optimization', 'Social Media Marketing', 'Google Ads', 'Online Brand Promotion'], id: 'digital-marketing' },
  ];
  readonly reasons = [
    { title: 'Creative & modern solutions', text: 'Fresh thinking that makes your business stand out.' },
    { title: 'Customized development', text: 'Solutions shaped around your unique goals and needs.' },
    { title: 'Responsive & user-friendly', text: 'Seamless experiences across every screen and device.' },
    { title: 'Latest technologies', text: 'The right tools, chosen for where you want to go.' },
    { title: 'Reliable support', text: 'A considered approach beyond the first launch.' },
    { title: 'Business-focused approach', text: 'Every detail connected to a meaningful outcome.' },
  ];
  readonly steps = [
    { number: '01', title: 'Discover', text: 'We listen, ask questions, and understand your requirements.' },
    { number: '02', title: 'Plan', text: 'Together, we turn your goals into a clear strategy.' },
    { number: '03', title: 'Create', text: 'Thoughtful design meets purposeful development.' },
    { number: '04', title: 'Launch', text: 'We test the details and bring your idea to life.' },
    { number: '05', title: 'Grow', text: 'We support what’s next as your business evolves.' },
  ];
  readonly technologies = [
    { mark: '5', name: 'HTML5' }, { mark: '3', name: 'CSS3' }, { mark: 'JS', name: 'JavaScript' }, { mark: 'TS', name: 'TypeScript' },
    { mark: 'A', name: 'Angular' }, { mark: 'R', name: 'React' }, { mark: 'W', name: 'WordPress' }, { mark: 'W', name: 'WooCommerce' },
    { mark: 'php', name: 'PHP' }, { mark: '.N', name: '.NET' }, { mark: 'F', name: 'Flutter' }, { mark: 'M', name: 'MySQL' },
    { mark: '✳', name: 'AI Tools' }, { mark: 'n', name: 'n8n' },
  ];

  toggleProject(project: string): void {
    this.expandedProject = this.expandedProject === project ? '' : project;
  }
}
