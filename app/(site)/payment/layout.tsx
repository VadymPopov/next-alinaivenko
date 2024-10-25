import { ProcessSteps } from '@/app/components/ProcessSteps';
import Section from '@/app/components/Section';
import Text from '@/app/components/Text';
import Title from '@/app/components/Title';

const links = [
  { label: 'Client', href: '/payment' },
  { label: 'Tip', href: '/payment/tip-amount' },
  { label: 'Payment', href: '/payment/confirmation' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <Title>Payment process</Title>
      <Text primary={true}>
        To complete your payment for the service, please fill out your
        information and specify the amount you intend to pay. In the next step,
        you have the option to include a tip. Review the total service cost,
        which includes any applicable convenience fees based on the service
        cost, taxes, and the added tip. Once reviewed, proceed to securely
        submit your payment. Thank you for choosing me to be your tattoo artist.
      </Text>
      <ProcessSteps links={links} />

      <div>{children}</div>
    </Section>
  );
}
