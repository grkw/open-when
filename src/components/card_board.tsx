import Card from "@/components/card";

export default function CardBoard() {

    return (<table>
    <tbody>
    <tr>
        <td><Card prompt="you're feeling blue" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you feel lost" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you've messed up" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    <tr>
        <td><Card prompt="you need a laugh" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you're exhausted" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you're pissed off" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    <tr>
        <td><Card prompt="you feel lonely" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you're worried about something" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
        <td><Card prompt="you're feeling sad" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
    </tr>
    </tbody>
    </table>);

}