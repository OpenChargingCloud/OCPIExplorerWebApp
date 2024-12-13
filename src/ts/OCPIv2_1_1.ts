/*
 * Copyright 2014-2024 GraphDefined GmbH <achim.friedland@graphdefined.com>
 * This file is part of OCPIExplorer <https://github.com/OpenChargingCloud/OCPIExplorerWebApp>
 *
 * Licensed under the Affero GPL license, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.gnu.org/licenses/agpl.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import    { OCPI, SearchResultsMode }  from './OCPICommon';
import * as IOCPIv2_1_1                from './IOCPIv2_1_1';

export class OCPIV2_1_1 {

    private readonly common: OCPI;

    constructor(common: OCPI)
    {
        this.common = common;
    }

    public renderEndpoints(endpoints:  Array<IOCPIv2_1_1.IEndpoint>,
                           container:  HTMLDivElement): void {

        for (const endpoint of endpoints) {

            // {
            //     "identifier": "locations",
            //     "url":        "https://api.charging.cloud/ocpi/v2.1.1/cpo/locations"
            // }

            const endpointDiv        = container.appendChild(document.createElement('div')) as HTMLDivElement;
            endpointDiv.className    = "endpoint defaultBox";

            const identifier1Div      = endpointDiv.appendChild(document.createElement('div')) as HTMLDivElement;
            identifier1Div.className  = `identifierLogo ${endpoint.identifier}`;

            switch (endpoint.identifier) {
                case "credentials": identifier1Div.innerHTML = '<i class="fa-regular fa-id-card"></i>';           break;
                case "locations":   identifier1Div.innerHTML = '<i class="fa-solid fa-charging-station"></i>';    break;
                case "tariffs":     identifier1Div.innerHTML = '<i class="fa-solid fa-money-bill-trend-up"></i>'; break;
                case "tokens":      identifier1Div.innerHTML = '<i class="fa-solid fa-passport"></i>';            break;
                case "sessions":    identifier1Div.innerHTML = '<i class="fa-solid fa-user-clock"></i>';          break;
                case "cdrs":        identifier1Div.innerHTML = '<i class="fa-solid fa-file-invoice-dollar"></i>'; break;
                case "commands":    identifier1Div.innerHTML = '<i class="fa-solid fa-terminal"></i>';            break;
                default:            identifier1Div.innerHTML = '<i class="fa-solid fa-square-binary"></i>';       break;
            }

            const rightDiv      = endpointDiv.appendChild(document.createElement('div')) as HTMLDivElement;
            rightDiv.className  = "right";

            const identifierDiv      = rightDiv.appendChild(document.createElement('div')) as HTMLDivElement;
            identifierDiv.className  = "identifier";
            identifierDiv.innerHTML  = endpoint.identifier;

            const urlDiv             = rightDiv.appendChild(document.createElement('div')) as HTMLDivElement;
            urlDiv.className         = "url";
            urlDiv.innerHTML         = `${endpoint.url} <i class="fa-regular fa-copy"></i>`;

            (urlDiv.querySelector("i") as HTMLDivElement).onclick = () => {
                const url = endpoint.url;
                navigator.clipboard.writeText(url).then(() => {
                    console.log(`URL ${url} copied to clipboard!`);
                }).catch(err => {
                    console.error('Failed to copy URL: ', err);
                });
            };

            if (endpoint.identifier === "locations")
                endpointDiv.onclick = async () => {
                    this.GetLocations(endpoint.url);
                };

        }

    }

    private async GetLocations(LocationsURL: string)
    {

        const versionDetailsScreenDiv  = document.          querySelector("#versionDetailsScreen")  as HTMLDivElement;
        const locationsScreenDiv       = document.          querySelector("#locationsScreen")       as HTMLDivElement;
        versionDetailsScreenDiv.style.display = "none";
        locationsScreenDiv.style.display      = "flex";

        this.common.OCPISearch<IOCPIv2_1_1.ILocationMetadata,
                               IOCPIv2_1_1.ILocation>(

            LocationsURL,
            () => {
                return "";
            },
            metadata => { },
            "location",
            location => location.id,
            "locations",
            "locations",

            // list view
            (resultCounter,
             location,
             locationAnchor) => {
      
                const locationCounterDiv      = locationAnchor.appendChild(document.createElement('div')) as HTMLDivElement;
                locationCounterDiv.className  = "counter";
                locationCounterDiv.innerHTML  = resultCounter.toString() + ".";

                const locationTitleDiv        = locationAnchor.appendChild(document.createElement('div')) as HTMLDivElement;
                locationTitleDiv.className    = "title";
                locationTitleDiv.innerHTML    = location.name
                                                    ? location.name + " (" + location.id + ")"
                                                    : location.id;
                                                // country_code
                                                // party_id

                const propertiesDiv           = locationAnchor.appendChild(document.createElement('div')) as HTMLDivElement;
                propertiesDiv.className       = "properties";

                if (location.operator) {
                    this.common.CreateProperty(
                        propertiesDiv,
                        "businessDetails operator",
                        "Operator",
                       (location.operator.website
                            ? "<a href=\"" + location.operator.website + "\">" + location.operator.name + "</a>"
                            : location.operator.name)
                    )
                }

                if (location.suboperator) {
                    this.common.CreateProperty(
                         propertiesDiv,
                         "businessDetails suboperator",
                         "Suboperator",
                        (location.suboperator.website
                             ? "<a href=\"" + location.suboperator.website + "\">" + location.suboperator.name + "</a>"
                             : location.suboperator.name)
                     )
                 }

                if (location.owner) {
                    this.common.CreateProperty(
                         propertiesDiv,
                         "businessDetails owner",
                         "Owner",
                         (location.owner.website
                             ? "<a href=\"" + location.owner.website + "\">" + location.owner.name + "</a>"
                             : location.owner.name)
                     )
                 }

                this.common.CreateProperty(
                    propertiesDiv,
                    "type",
                    "Type",
                    location.type
                )

                this.common.CreateProperty(
                    propertiesDiv,
                    "address",
                    "Address",
                    location.address + ", " + location.postal_code + " " + location.city + ", " + location.country + (location.time_zone ? " (" + location.time_zone + ")" : "")
                );

                this.common.CreateProperty(
                    propertiesDiv,
                    "coordinates",
                    "Lat/Lng",
                    location.coordinates.latitude + ", " + location.coordinates.longitude
                );

                // opening_times?

                // related_locations?
                // directions?
                // facilities?

                // charging_when_closed?
                // images?
                // energy_mix?

                // publish (PlugSurfing extension)

                const evsesDiv        = locationAnchor.appendChild(document.createElement('a')) as HTMLAnchorElement;
                evsesDiv.className    = "evses";

                let numberOfEVSE = 1;

                if (location.evses) {
                    for (const evse of location.evses) {

                        const evseDiv                = evsesDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        evseDiv.className            = "evse evseStatus_" + evse.status;
      
                        const statusDiv              = evseDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        statusDiv.className          = "evseStatus evseStatus_" + evse.status;
                        statusDiv.innerHTML          = evse.status;
      
                        const evesIdDiv              = evseDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        evesIdDiv.className          = "evseId";
                        evesIdDiv.innerHTML          = (numberOfEVSE++) + ". " + evse.uid + (evse.evse_id && evse.evse_id != evse.uid ? " (" + evse.evse_id + ")" : "")
                                                           + (evse.physical_reference ? " [" + evse.physical_reference + "]" : "");

                        const evsePropertiesDiv      = evseDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        evsePropertiesDiv.className  = "properties";

                        if (evse.floor_level)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "floorLevel",
                                "Floor Level",
                                evse.floor_level
                            );

                        this.common.CreateProperty(
                            evsePropertiesDiv,
                            "coordinates",
                            "Lat/Lng",
                            evse.coordinates.latitude + ", " + evse.coordinates.longitude
                        );

                        if (evse.capabilities)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "capabilities",
                                "Capabilities",
                                evse.capabilities.map(capability => capability).join(", ")
                            );

                        if (evse.parking_restrictions)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "parkingRestrictions",
                                "Parking Restrictions",
                                evse.parking_restrictions.map(parkingRestriction => parkingRestriction).join(", ")
                            );

                        if (evse.images)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "images",
                                "Images",
                                evse.images.map(image => image).join("<br />")
                            );

                        if (evse.directions)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "directions",
                                "Directions",
                                evse.directions.map(direction => "(" + direction.language + ") " + direction.text).join("<br />")
                            );

                        if (evse.status_schedule)
                            this.common.CreateProperty(
                                evsePropertiesDiv,
                                "statusSchedule",
                                "Status Schedule",
                                evse.status_schedule.map(statusSchedule => statusSchedule.status + " (" + statusSchedule.period_begin + (statusSchedule.period_end ? " => " + statusSchedule.period_end : "") + ")").join("<br />")
                            );

                        // energy_meter (OCC Calibration Law Extentions)

                        const connectorsDiv     = evseDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        connectorsDiv.className = "connectors";

                        if (evse.connectors) {
                            for (var connector of evse.connectors) {

                                const connectorDiv                = connectorsDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                                connectorDiv.className            = "connector";

                                const connectorInfoDiv            = connectorDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                                connectorInfoDiv.className        = "connectorInfo";
                                connectorInfoDiv.innerHTML        = connector.id + ". " + connector.standard + ", " + connector.format + ", " + connector.amperage + " A, " + connector.voltage + " V, " + connector.power_type;

                                const connectorPropertiesDiv      = connectorDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                                connectorPropertiesDiv.className  = "properties";

                                if (connector.tariff_id)
                                    this.common.CreateProperty(
                                        connectorPropertiesDiv,
                                        "tariffInfo",
                                        "Tariff",
                                        connector.tariff_id
                                    );

                                if (connector.terms_and_conditions)
                                    this.common.CreateProperty(
                                        connectorPropertiesDiv,
                                        "terms",
                                        "Terms",
                                        connector.terms_and_conditions
                                    );

                                const datesDiv      = connectorDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                                datesDiv.className  = "dates properties";

                                if (connector.created)
                                    this.common.CreateProperty(
                                        datesDiv,
                                        "created",
                                        "Created:",
                                        connector.created
                                    )

                                this.common.CreateProperty(
                                    datesDiv,
                                    "lastUpdated",
                                    "Last updated:",
                                    connector.last_updated
                                )

                            }
                        }

                        const datesDiv      = evseDiv.appendChild(document.createElement('div')) as HTMLDivElement;
                        datesDiv.className  = "dates properties";

                        if (evse.created)
                            this.common.CreateProperty(
                                datesDiv,
                                "created",
                                "Created:",
                                evse.created
                            )

                        this.common.CreateProperty(
                            datesDiv,
                            "lastUpdated",
                            "Last updated:",
                            evse.last_updated
                        )

                    }
                }

                const datesDiv      = locationAnchor.appendChild(document.createElement('div')) as HTMLDivElement;
                datesDiv.className  = "dates properties";

                if (location.created)
                    this.common.CreateProperty(
                        datesDiv,
                        "created",
                        "Created:",
                        location.created
                    )

                this.common.CreateProperty(
                    datesDiv,
                    "lastUpdated",
                    "Last updated:",
                    location.last_updated
                )

            },

            // table view
            (tariffs, tariffsDiv) => {
            },

            // linkPrefix
            undefined,//tariff => "",
            SearchResultsMode.listView,

            context => {
                //statusFilterSelect.onchange = () => {
                //    context.Search(true);
                //}
            }

        );

    }

}
