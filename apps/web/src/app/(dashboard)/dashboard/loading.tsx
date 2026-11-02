import { StatusPanel } from '@/components/ui/status-panel';

export default function DashboardLoading() {
  return (
    <StatusPanel title="Loading your workspace">
      <p>Fetching your authenticated LaunchForge profile.</p>
    </StatusPanel>
  );
}
