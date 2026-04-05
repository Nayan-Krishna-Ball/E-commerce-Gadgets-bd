//
export default function ProductFeatures({ features }) {
  if (!features) return null;

  return (
    <ul className="list-disc list-inside space-y-1 text-sm">
      {features.cpu && (
        <li>
          <b>CPU:</b> {features.cpu}
        </li>
      )}

      {features.gpu && (
        <li>
          <b>GPU:</b> {features.gpu}
        </li>
      )}

      {features.ram && (
        <li>
          <b>Memory:</b> {features.ram}
        </li>
      )}

      {features.storage && (
        <li>
          <b>Storage:</b> {features.storage}
        </li>
      )}

      {features.display && (
        <li>
          <b>Display:</b> {features.display}
        </li>
      )}

      {features.battery && (
        <li>
          <b>Battery:</b> {features.battery}
        </li>
      )}

      {features.connectivity && (
        <li>
          <b>connectivity:</b> {features.connectivity}
        </li>
      )}

      {features.noiseCanceling && (
        <li>
          <b>noiseCanceling:</b> {features.noiseCanceling}
        </li>
      )}

      {features.driver && (
        <li>
          <b>driver:</b> {features.driver}
        </li>
      )}

      {features.camera && (
        <li>
          <b>Camera:</b> {features.camera}
        </li>
      )}

      {features.ports?.length > 0 && (
        <li>
          <b>Ports:</b> {features.ports.join(", ")}
        </li>
      )}
    </ul>
  );
}
