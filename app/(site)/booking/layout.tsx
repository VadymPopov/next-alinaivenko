import { ProcessSteps } from '@/app/components/ProcessSteps';
import Section from '@/app/components/Section';
import Text from '@/app/components/Text';
import Title from '@/app/components/Title';

const links = [
  { label: 'Service', href: '/booking' },
  { label: 'Client', href: '/booking/client-info' },
  { label: 'Time', href: '/booking/schedule' },
  { label: 'Payment', href: '/booking/payment' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Section>
      <div className="flex">
        <div>
          <Title>Booking process</Title>
          <Text primary={true}>
            To schedule an appointment, complete your information, pick your
            preferred service and starting time, and proceed to secure your
            booking with a deposit. Please be aware that the total service cost
            will be determined based on your specific requirements. The online
            payment serves as a non-refundable deposit, covering preparatory
            expenses for your appointment. This deposit ensures that costs are
            covered in case of a cancellation. For Small Tattoo and Permanent
            services, a deposit of CA$100 is required. For Large Tattoo
            services, the deposit amount is CA$120. All deposits will be
            deducted from the final cost of the service. A minimum of 48
            hours&apos; notice is necessary to cancel or reschedule a tattoo or
            cosmetic appointment; otherwise, a new deposit might be required.
          </Text>
          <Text>
            <b>Please note:</b> I do not offer finger tattoos, inner lip
            tattoos, or tattoos in intimate areas due to poor healing outcomes.
            Thank you for understanding.
          </Text>
        </div>
      </div>
      <ProcessSteps links={links} />

      <div>{children}</div>
    </Section>
  );
}
