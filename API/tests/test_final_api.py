import io
import json
import pandas as pd
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

# Import your app
import final_api
client = TestClient(final_api.app)

@pytest.fixture
def sample_csv_bytes():
    # Create a small CSV with 2 student points
    df = pd.DataFrame({
        "Latitude": [25.25, 25.26],
        "Longitude": [55.46, 55.47]
    })
    csv_bytes = io.BytesIO()
    df.to_csv(csv_bytes, index=False)
    csv_bytes.seek(0)
    return csv_bytes

def test_home_page():
    """Test that the home page loads"""
    res = client.get("/")
    assert res.status_code == 200
    assert b"Smart School Routing API" in res.content

@patch("final_api.get_osrm_table_chunked")
def test_cluster_and_route(mock_osrm, sample_csv_bytes):
    """Test the /cluster_and_route endpoint with mocked OSRM"""
    # Mock OSRM matrix to avoid real HTTP calls
    mock_osrm.return_value = [[0, 100], [100, 0]]

    res = client.post(
        "/cluster_and_route",
        files={"file": ("students.csv", sample_csv_bytes, "text/csv")},
        data={
            "eps": 50,
            "min_samples": 1,
            "bus_capacities": "21",
            "min_fill_ratio": 0.8,
            "max_allowed_dist_km": 2.0,
            "avg_speed_kmph": 60,
            "stop_time_per_student": 60,
            "start_time": "07:00"
        }
    )

    assert res.status_code == 200
    data = res.json()
    assert "trip_id" in data
    assert data["message"] == "Routing complete"

def test_routes_empty():
    """Test /routes when no trips exist"""
    res = client.get("/routes")
    assert res.status_code == 200
    assert isinstance(res.json(), dict)

def test_nonexistent_trip():
    """Test GET /routes/{trip_id} with an invalid ID"""
    res = client.get("/routes/invalid_trip_id")
    assert res.status_code == 404
    assert "Trip ID not found" in res.text
